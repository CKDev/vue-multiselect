<template>
  <div class="v-multiselect" :class="classes" :style="variables" @click="onFocusSearch()" @keydown.delete="onRemove(tokenIndex)" @keydown.tab="onTab($event)" @keydown.left="onSeek(-1)" @keydown.right="onSeek(1)">
    <ul class="tokens">
      <li v-test="{ id: 'token' }" v-for="option in selections" :key="option.state.index" tabindex="0" @click.stop="onFocusToken(option.state.index)" @focus="onFocusToken(option.state.index)" @blur="onBlur()">
        <slot v-if="!!$scopedSlots.token" name="token" class="token" :option="option" :remove="() => onRemove(option.state.index)" :class="{ 'is-active': isTokenActive(option.state.index) }" />
        <div v-else class="token" :class="{ 'is-active': isTokenActive(option.state.index) }">
          <span v-html="option.label"></span>
          <button v-if="!isMobile()" @click.stop="onRemove(option.state.index)" tabindex="-1" class="token-remove"></button>
        </div>
      </li>
      <div class="token-input">
        <input v-test="{ id: 'search' }" ref="search" class="search" type="text" :disabled="disabled" :placeholder="placeholder" tabindex="0" spellcheck="false" autocomplete="off" v-model="filter" @keydown.delete.stop="onDelete()" @keydown.esc="onToggle(false)" @keydown.up.prevent="onArrowPress(-1)" @keydown.down.prevent="onArrowPress(1)" @keydown.enter="onEnter()" @keydown.tab="onTab($event)" @focus="onFocusSearch()" @blur="onBlur()" />
        <div ref="options" class="options" style="animation-duration: 0s;">
          <div class="list">
            <template v-for="opt in available">
              <component v-test="{ id: 'optgroup' }" v-if="opt.state.group" :key="opt.state.index" :is="optgroup" :group="opt"></component>
              <component v-test="{ id: 'option' }" v-else :is="option" :key="opt.state.index" :option="opt" @click.native.stop="onClickOption(opt.state.index)" @mouseover.native="onHover(opt.state.index)"></component>
            </template>
          </div>
          <div v-if="hasSuggestion()" class="suggestion">
            <div v-if="!!$scopedSlots.suggestion" @click.stop="onClickOption(suggestion.state.index)" @mouseover="onHover(suggestion.state.index)">
              <slot name="suggestion" :suggestion="suggestion" />
            </div>
            <component v-else v-test="{ id: 'option' }" :is="option" :option="suggestion" @click.native.stop="onClickOption(suggestion.state.index)" @mouseover.native="onHover(suggestion.state.index)"></component>
          </div>
        </div>
      </div>
    </ul>
    <select ref="select" class="select" tabindex="-1" multiple v-html="getOptionsHtml()" @change="onSelectChanged($event)"></select>
  </div>
</template>

<script type="text/javascript">
import Select from '@ckd/vue-select'
import Test from '../directives/test.js'

export default {
  name: 'VMultiselect',
  extends: Select,
  directives: { Test },
  props: {
    openOnFocus: {
      type: Boolean,
      default: true
    },
    openOnArrow: {
      type: Boolean,
      default: true
    },
    allowSuggest: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted: function(){
    // Emit the necessary change/input event initially, so the current value is known
    this.onChange()

    // Create a placeholder div with the placeholder text, needed to calcuate
    // the width of the actual placeholder. This div is removed immediately after
    this.$nextTick(() => {
      // Ensure our placeholder element for measuring width has the necessary css scope attributes
      this.setSearchInputWidth(this.placeholder)
    })
  },
  watch: {
    /**
     * When current selections change, emit appropriate events
     * input is for compatibility with v-model
     */
    selections: function(){
      this.onChange()
    },
    /**
     * When current filter text changes, 
     */
    filter: function(new_value){
      // Reset the suggested option
      this.suggestion = null

      const options = this.getAvailableOptions()

      if(!options.some(o => [this.hoverIndex, this.highlightIndex].includes(o.state.index)) && options.length){
        // Force hover over the first available option
        this.hoverIndex = options[0].state.index
      }else if(this.isSuggestable()){
        // If no available options and suggestion is permitted,
        // create the suggestion and set it as currently hovered
        this.suggestion = this.getSuggestion()
        this.hoverIndex = this.suggestion.state.index
      }

      // Set the current status of our drop down
      this.open = new_value.trim() != '' && (this.available.length > 0 || !!this.suggestion)

      // Expand the search input text box to fit the filter text
      this.setSearchInputWidth(new_value)

      // Re-position the dropdown
      this.$nextTick(() => {
        this.calcPosition()
      })
    },
    /**
     * Update all options with the current hover state given the current hover index
     */
    hoverIndex: function(new_index){
      if(this.suggestion){
        // If a suggestion option exists, update it's hover state
        this.suggestion.state.hovered = this.suggestion.state.index == new_index
      }

      // Update the hover state of every option
      this.list.forEach(o => o.state.hovered = o.state.index == new_index)
    },
    /**
     * Update all options with the current highlight state given the current highlight index
     */
    highlightIndex: function(new_index){
      if(this.suggestion){
        // If a suggestion option exists, update it's highlighted state
        this.suggestion.state.highlighted = this.suggestion.state.index == new_index
      }

      // Update the highlighted state of every option
      this.list.forEach(o => o.state.highlighted = o.state.index == new_index)
    }
  },
  methods: {
    /**
     * Calculate the width of the given text and
     * set the search input text box width to match
     */
    setSearchInputWidth: function(text){
      // Ensure our placeholder element for measuring width has the necessary css scope attributes
      const scopes = Object.values(this.$refs.search.attributes).filter(a => /^data-v-.*$/.test(a.name))
      const comparison = document.createElement('DIV')

      scopes.forEach(a => comparison.setAttribute(a.name, ''))

      comparison.style.visibility = 'hidden'
      comparison.style.display = 'inline-block'
      comparison.className = this.$refs.search.className
      comparison.appendChild(document.createTextNode(text))
      this.$el.querySelector('.token-input').appendChild(comparison)

      this.$refs.search.style.width = `${comparison.offsetWidth}px`
      comparison.remove()
    },
    /**
     * Emit appropriate events with the mapped selection values
     * The input event is for compatibility with v-model
     */
    onChange: function(){
      this.$emit('input', this.selections.map(o => o.value))
      this.$emit('change', this.selections.map(o => o.value))
    },
    /**
     * Close the dropdown and remove the focus when a token
     * or the input field is blurred. Either value may be reset
     * immediately after this depending on what receives the new focus
     */
    onBlur: function(){
      this.open = false
      this.focused = false
    },
    /**
     * Triggered to force focus on the search input
     * Will reset the active token, set the current focused state
     * and open the dropdown if configured to do so
     */
    onFocusSearch: function(){
      // Don't do anything if disabled
      if(this.disabled) return

      // Reset the active token index, so none are highlighted
      this.tokenIndex = -1

      // Set the component as "focused", so the corresponding class is added
      this.focused = true

      if(this.isMobile()) return

      // If set to open the options list on focus, open it
      if(this.openOnFocus){
        this.open = true
      }

      // Ensure the input is actually focused (if not already), as this method
      // may be called when the input does not already focused
      if(document.activeElement != this.$refs.search){
        this.$refs.search.focus()
      }
    },
    /**
     * Sets the current active token, closes the dropdown,
     * and ensures that the component is "focused"
     */
    onFocusToken: function(idx){
      this.open = false
      this.focused = true
      this.tokenIndex = idx
    },
    /**
     * When the delete/backspace key is pressed, check and
     * see if the search input is empty and, if so, delete the 
     * last token from the list, since the implied effect is that
     * we want to delete the thing prior to the search input
     */
    onDelete: function(){
      if(this.filter == ''){
        const prev = this.selections.pop()
        if(prev) this.removeSelection(prev.state.index)
      }
    },
    /**
     * Deletes a selected option (token) from the selections,
     * identified by it's specific index value. Immediately
     * re-focuses on the search input field after removing
     */
    onRemove: function(idx){
      this.removeSelection(idx)
    },
    onSeek: function(offset){
      // Only seek between tokens if the search input field is blank
      // and we are moving to the left, or currently have an active token
      if(this.filter == '' && (offset < 0 || this.tokenIndex > -1)){
        let current

        if(offset < 0){
          // Get the index of the current active token, or last token index + 1 if none (next step will reduce from this index)
          current = this.tokenIndex > -1 ? this.selections.findIndex(o => o.state.index == this.tokenIndex) : this.selections.length
        }else if(offset > 0){
          // Get the index of the current active token, or first token index - 1 if none (next step will increment from this index)
          current = this.tokenIndex > -1 ? this.selections.findIndex(o => o.state.index == this.tokenIndex) : -1
        }

        // Change the current active index
        current += offset

        // Don't allow us to decrement past the first token in the list
        if(current < 0) current = 0

        if(this.selections[current]){
          // Focus on the active token (the focus event will set +this.tokenIndex+ to the active token)
          this.$el.querySelectorAll(`.token:nth-child(${current + 1})`)[0].focus()
        }else{
          // We incremented from the last token in the list, and are back on the input field
          this.onFocusSearch()
        }
      }
    },
    /**
     * When the enter key is pressed, select the implied option,
     * if any, and then focus back on the input field
     */
    onEnter: function(){
      if(this.hasImpliedOption()){
        this.selectImpliedOption()
      }
    },
    /**
     * When tab key is pressed
     */
    onTab: function(event){
      if(this.hasImpliedOption() && !event.shiftKey){
        // If there is an option to choose and we're not tabbing backwards
        event.preventDefault()

        // Select the "implied" option (currently hovered or highlighted)
        this.selectImpliedOption()

        // Focus back on the input field
        this.onFocusSearch()
      }else if(this.open && !event.shiftKey){
        // If there is no option to choose from and we're not tabbing backwards
        event.preventDefault()
        this.open = false
      }else{
        // Close the dropdown, remove focus from the component, and reset all indexes
        this.open = false
        //this.focused = false
        this.tokenIndex = -1
        this.hoverIndex = -1
        this.highlightIndex = -1
      }
    },
    /**
     * When clicked outside the component, decide whether to just
     * close the dropdown, or lose focus from the component altogether
     * If losing focus, also reset all indexes, as if we no longer want
     * to focus on any part of the component
     */
    onClickOutside: function(){
      // If already closed, lose focus and reset indexes
      if(!this.open){
        this.focused = false
        this.hoverIndex = -1
        this.highlightIndex = -1
        this.tokenIndex = -1
      }
      this.open = false
    },
    /**
     * When an option with the given index is clicked,
     * add it to the selections list. If the given index is -1,
     * try and select the implied option, if any.
     */
    onClickOption: function(idx){
      // Select the implied option, if any
      if(idx < 0 && this.hasImpliedOption()){
        this.selectImpliedOption()
        return;
      }

      // Find the option with the matching index, including
      // the current suggestion option, if any
      const selected = Array.prototype.concat.apply([], [this.suggestion, this.list]).filter(o => !!o).find(o => o.state.index == idx)

      if(selected){
        // Matching option was found, set it as selected and add it to the selections
        selected.selected = true
        this.selections.push(selected)

        // Reset the search input and indexes, re-focus on the input
        this.filter = ''
        this.hoverIndex = -1
        this.highlightIndex = -1
        this.onFocusSearch()
      }
    },
    /**
     * When the native select input value changes,
     * find the index of the option from the value
     * and update the selected option in the data +list+
     */
    onSelectChanged: function(event){
      this.list.forEach(o => o.selected = false)

      const values = Array.prototype.slice.call(event.target.selectedOptions, 0).map(o => o.value)
      this.selections = this.list.filter(o => values.includes(o.value)).map(o => {
        o.selected = true
        return o
      })
    },
    /**
     * Get whether or not the given token index is active
     */
    isTokenActive: function(idx){
      return this.tokenIndex > -1 && this.tokenIndex == idx
    },
    /**
     * Remove the selection with the matching given index from
     * the list of selections.
     */
    removeSelection: function(idx){
      // Find the active option in the selections
      const index = this.selections.findIndex(o => o.state.index == idx)

      // Remove the active option from the selections
      if(index > -1) this.selections.splice(index, 1)

      // Find the option in the list, and reset it's state so it becomes available in the options again
      const option = this.list.find(o => o.state.index == idx)

      if(option){
        option.selected = false
        option.state.hovered = false
        option.state.highlighted = false
      }

      // Re-focus on the search input field
      this.onFocusSearch()
    },
    calcPosition: function(){
      if(this.$refs.search && this.$refs.options){
        const location = this.$refs.search.getBoundingClientRect()
        const space = this.getAvailableSpace()
        const optionHeight = this.$refs.options.scrollHeight

        if(space.bottom >= space.top){
          this.height = Math.min(space.bottom, this.size + 30) - 30
          this.top = location.top + location.height
        }else{
          this.height = Math.min(space.top, optionHeight + 30, this.size + 30) - 30
          this.top = location.top - this.height
        }

        this.left = location.left
      }
    },
    onArrowPress: function(offset){
      if(this.openOnArrow) this.open = true

      // If not seeking, add the class
      if(!this.$el.classList.contains('is-seeking')){
        this.$el.classList.add('is-seeking')
      }

      const permitted = this.getAvailableOptions().map(o => o.state.index)

      // `resetHover` uses `debounce`, so it only is called after 100ms
      // Each call to `resetHover` actually resets the clock
      this.resetHover()

      if(this.highlightIndex < 0 && this.hoverIndex < 0){
        // If nothing is highlighted or hovered, highlight the first available option
        this.highlightIndex = permitted[0]
      }else if(this.highlightIndex < 0 && this.hoverIndex >= 0){
        // If hovering over an option, that option should be highlighted
        this.highlightIndex = this.hoverIndex
      }else{
        // Moving up or down the list, find the next option by the offset given
        const nextIndex = permitted[permitted.indexOf(this.hoverIndex) + offset]
        if(!isNaN(nextIndex)) this.highlightIndex = nextIndex
      }

      // Consider that highlighting in this context is the same as hovering
      this.hoverIndex = this.highlightIndex

      if(this.open){
        // Dropdown is open, so make sure our newly highlighted option is in view
        this.$nextTick(this.scrollToHighlighted)
      }
    },
    getAvailableOptions: function(){
      return this.available.filter(o => !o.state.group && !o.disabled)
    },
    hasImpliedOption: function(){
      return this.open && this.focused && (this.hoverIndex > -1 || this.highlightIndex > -1)
    },
    /**
     * Suggestable if the configured to allow suggestions,
     * the available list of options is empty, and none of
     * the current selection values match the current filter string
     */
    isSuggestable: function(){
      return this.allowSuggest
          && this.available.length == 0
          && !this.selections.some(o => o.value == this.filter.trim())
    },
    /**
     * Whether or not a suggestion option exists
     */
    hasSuggestion: function(){
      return !!this.suggestion
    },
    getSuggestion: function(){
      const suggestion = this.getRepairedItem({ label: this.filter.trim(), value: this.filter.trim() })

      // If no custom slot is defined for displaying the
      // suggestion, include some default text
      if(!this.$scopedSlots.suggestion){
        suggestion.item = `Create <strong>${this.filter}</strong>`
      }

      return suggestion
    }
  },
  computed: {
    classes: function(){
      return [
        { 'is-focused': this.focused },
        { 'is-disabled': this.disabled },
        { 'is-open': this.open },
        { 'is-mobile': this.isMobile() },
        this.direction
      ]
    },
    variables: function(){
      return {
        '--height': `${this.height}px`,
        '--width': this.width == 'auto' ? 'auto' : `${this.width}px`,
        '--top': `${this.top + (this.$refs.label ? this.$refs.label.offsetHeight : 0)}px`,
        '--left': `${this.left}px`
      }
    },
    available: function(){
      const query = new RegExp(this.filter.trim().replace(/\\/g, '\\\\').split(/\s+/).join('|'), 'i')

      // Get all matches, excluding optgroups, disabled, and already selected options
      const matches = this.list.slice(0).filter(o => !o.state.group && !o.disabled && !o.selected && query.test(o.label))

      // Gather all indexes of options that were matched
      const indexes = matches.slice(0).map(o => o.state.index)

      // Final list is anything with one of the matched indexes (options), or a group that contains one of the matched options
      return this.list.slice(0).filter(o => {
        if(o.state.group){
          return matches.some(op => op.state.groups.includes(o.state.group_id))
        }else{
          return indexes.includes(o.state.index)
        }
      })
    }
  },
  data: function(){
    return {
      tokenIndex: -1,
      selections: [],
      suggestion: null
    }
  }
}
</script>

<style lang="scss" scoped>
.v-multiselect {
  display: inline-block;
  min-width: 10px;
  box-sizing: border-box;
  text-align: left;
  position: relative;
  background: #fff;
  outline: none;
  border: 1px solid #e5e5e5;
  background: #fff;
  cursor: text;

  &.is-disabled {
    cursor: default;
  }

  /**
   * Show the options dropdown when the is-open class exists
   * Do NOT show it if it's empty (no options) as it may have
   * other effects applied that are still visible, i.e. - shadows
   */
  &.is-open .options:not(:empty) {
    z-index: 1;
    animation: show 150ms ease-out;
    animation-fill-mode: forwards;
  }

  /**
   * If on a mobile browser, make the native select input
   * 0% opacity, but overlay the entire clickable area, so
   * it will be invoked instead when clicked on
   */
  &.is-mobile .select {
    opacity: 0;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}

/**
 * @see https://ghinda.net/article/mimic-native-focus-css/
 */
.v-multiselect.is-focused {
  outline-width: 2px;
  outline-style: solid;
  outline-color: Highlight;
}

@media (-webkit-min-device-pixel-ratio:0) {
  .v-multiselect.is-focused {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
  }
}

.v-multiselect * {
  box-sizing: border-box;
}

.search {
  white-space: nowrap;
  border: 0;
  outline: none;
  padding: 0;
  line-height: 28px;
  min-width: 10px;
  max-width: 100%;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
}

.tokens {
  padding: 8px 0 0;
  margin: 0;
  list-style: none;
  background: inherit;

  &::before,
  &::after {
    content: ' ';
    display: table;
  }

  &:after {
    clear: both;
  }
}

.token,
.token-input {
  float: left;
  margin-left: 8px;
}

.token {
  background-color: #f1f1f1;
  padding-left: 8px;
  line-height: 28px;
  cursor: pointer;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  &.is-active {
    background-color: #231e49;
    color: #fff;
  }
}

/**
 * If no close button exists, add some additional space
 * to the right of the token text, so it looks evenly spaced
 */
.token > *:first-child:last-child {
  margin-right: 8px;
}

.token-remove {
  width: 28px;
  height: 28px;
  padding: 0;
  background: none;
  border: 0;
  position: relative;
  cursor: pointer;
  outline: none;

  &::before,
  &::after {
    content: '';
    top: 50%;
    left: 50%;
    position: absolute;
    display: block;
    height: 12px;
    width: 2px;
    border-radius: 1px;
    background-color: #9e9d9d;
    margin-top: -6px;
    margin-right: -6px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
}

.token-input {
  position: relative;
  background: inherit;
  margin: 0 8px 8px;
  max-width: calc(100% - 16px); // 100%, minus the left/right margin
}

.options {
  position: absolute;
  overflow: auto;
  max-height: var(--height);
  background: inherit;
  position: fixed;
  top: var(--top);
  left: var(--left);
  min-width: var(--width);
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.4);
  animation: hide 150ms ease-out;
  animation-fill-mode: forwards;
}

.suggestion {
  cursor: pointer;
}

.select {
  display: none;
}

@keyframes hide {
  0% {
    display: block;
    opacity: 1;
  }
  99% {
    display: block;
    transform: scale(1);
  }
  100% {
    display: none;
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes show {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
}
</style>
