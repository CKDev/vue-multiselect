import { mount, shallowMount } from '@vue/test-utils'
import Multiselect from '@/multiselect.vue'

import Helper from '../helpers.js'

import States from './data/states.json'
import Cocktails from './data/cocktails.json'

let wrapper, options, selected, focusMock

beforeEach(() => {
  ({ wrapper, options, selected } = Helper.setup({ options: Cocktails }, { selected: 5 }))
})

afterEach(() => {
  wrapper.destroy()
})

describe('multiselect.vue', () => {
  it('should render a vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should add the clicked option to the selections', () => {
    wrapper.setData({ open: true })
    const option = Helper.collect(options, 1)
    expect(wrapper.vm.selections).toEqual([])
    option.trigger('click')
    expect(wrapper.vm.selections).toEqual([option.vm.option])
  })

  it('should select the focused option when key.tab is pressed', () => {
    expect(wrapper.vm.selections).toEqual([])
    const option = Helper.collect(options, 1)
    wrapper.setData({ open: true, focused: true, hoverIndex: option.vm.option.state.index })
    wrapper.trigger('keydown.tab')
    expect(wrapper.vm.selections).toEqual([option.vm.option])
  })

  it('should select the highlighted option when key.tab is pressed', () => {
    expect(wrapper.vm.selections).toEqual([])
    const option = Helper.collect(options, 1)
    wrapper.setData({ open: true, focused: true, highlightIndex: option.vm.option.state.index })
    wrapper.trigger('keydown.tab')
    expect(wrapper.vm.selections).toEqual([option.vm.option])
  })

  it('should select the focused option when key.enter is pressed', () => {
    expect(wrapper.vm.selections).toEqual([])
    const option = Helper.collect(options, 1)
    wrapper.setData({ open: true, focused: true, hoverIndex: option.vm.option.state.index })
    wrapper.find('[data-test-id="search"]').trigger('keydown.enter')
    expect(wrapper.vm.selections).toEqual([option.vm.option])
  })

  it('should select the highlighted option when key.enter is pressed', () => {
    expect(wrapper.vm.selections).toEqual([])
    const option = Helper.collect(options, 1)
    wrapper.setData({ open: true, focused: true, highlightIndex: option.vm.option.state.index })
    wrapper.find('[data-test-id="search"]').trigger('keydown.enter')
    expect(wrapper.vm.selections).toEqual([option.vm.option])
    //expect(focusMock.mock.calls.length).toBe(1)
  })

  it('should remove the last selection in the list when key.delete pressed', () => {
    const option = Helper.collect(options, 1)
    option.trigger('click')
    wrapper.find('[data-test-id="search"]').trigger('focus')
    wrapper.find('[data-test-id="search"]').trigger('keydown.delete')
    expect(wrapper.vm.selections).toEqual([])
  })

  it('should focus on a clicked token', (done) => {
    const option = Helper.collect(options, 1)
    option.trigger('click')

    wrapper.vm.$nextTick(() => {
      const token = wrapper.find('[data-test-id="token"]')
      token.trigger('click')
      expect(wrapper.vm.tokenIndex).toEqual(option.vm.option.state.index)
      done()
    })
  })

  it('should be suggestable when no matching option exists', (done) => {
    const jibberish = 'anoptionvaluethatdoesnotexist'
    wrapper.setProps({ allowSuggest: true })
    wrapper.setData({ filter: jibberish })
    wrapper.trigger('input')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.v-option').length).toEqual(1)
      const suggestion = wrapper.find('.v-option')
      expect(suggestion.vm.option.value).toEqual(jibberish)
      expect(suggestion.vm.option.label).toEqual(jibberish)
      done()
    })
  })

  it('should not be suggestable if prop.allow-suggest is falsy', () => {
    const jibberish = 'anoptionvaluethatdoesnotexist'
    wrapper.setData({ filter: jibberish })
    wrapper.trigger('input')

    wrapper.setProps({ allowSuggest: true })
    expect(wrapper.vm.isSuggestable()).toBeTruthy()

    wrapper.setProps({ allowSuggest: false })
    expect(wrapper.vm.isSuggestable()).toBeFalsy()
  })

  it('should call remove when key.delete pressed', () => {
    const removeMock = jest.fn()
    wrapper.vm.removeSelection = removeMock

    wrapper.trigger('keydown.delete')
    expect(removeMock).toHaveBeenCalled()
  })

  it('should seek through selected tokens using key.left', (done) => {
    const opts = Helper.collect(options, 3)
    opts.forEach(o => o.trigger('click'))

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.tokenIndex).toEqual(-1)
      wrapper.trigger('keydown.left')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.tokenIndex).toEqual(opts[opts.length - 1].vm.option.state.index)
        done()
      })
    })
  })

  it('should seek through selected tokens using key.right', (done) => {
    const opts = Helper.collect(options, 3)
    opts.forEach(o => o.trigger('click'))
    wrapper.setData({ tokenIndex: opts[0].vm.option.state.index })

    wrapper.vm.$nextTick(() => {
      wrapper.trigger('keydown.right')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.tokenIndex).toEqual(opts[1].vm.option.state.index)
        done()
      })
    })
  })

  it('should return to the search field if seeking forward from last token', (done) => {
    const opts = Helper.collect(options, 3)
    const focusMock = jest.fn()

    opts.forEach(o => o.trigger('click'))
    wrapper.setData({ tokenIndex: opts[opts.length - 1].vm.option.state.index })
    wrapper.vm.onFocusSearch = focusMock

    wrapper.vm.$nextTick(() => {
      wrapper.trigger('keydown.right')
      expect(focusMock).toHaveBeenCalled()
      done()
    })
  })

  it('should change the selection when the native select input changes', () => {
    expect(wrapper.vm.selections).toHaveLength(0)

    const select = wrapper.find('select')
    const nativeOptions = wrapper.findAll('select option')
    const option = nativeOptions.at(Math.floor(Math.random() * nativeOptions.length))
    option.element.setAttribute('selected', 'selected')
    select.trigger('change')

    expect(wrapper.vm.selections).toHaveLength(1)
  })

  it('should highlight the hovered option on arrow press', (done) => {
    const opts = Helper.collect(options, 1)
    wrapper.setData({ hoverIndex: opts.vm.option.state.index })

    expect(wrapper.vm.highlightIndex).toEqual(-1)
    wrapper.find('[data-test-id="search"]').trigger('keydown.down')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.highlightIndex).toEqual(opts.vm.option.state.index)
      done()
    })
  })

  it('should close the dropdown when clicked outside and opened', () => {
    wrapper.setData({ open: true, focused: true, highlightIndex: 1, hoverIndex: 1, tokenIndex: 1 })

    wrapper.vm.onClickOutside()

    expect(wrapper.vm.open).toBeFalsy()
    expect(wrapper.vm.focused).toBeTruthy()
    expect(wrapper.vm.highlightIndex).toEqual(1)
    expect(wrapper.vm.hoverIndex).toEqual(1)
    expect(wrapper.vm.tokenIndex).toEqual(1)
  })

  it('should reset the state of the input when clicked outside and closed', () => {
    wrapper.setData({ open: false, focused: true, highlightIndex: 1, hoverIndex: 1, tokenIndex: 1 })

    wrapper.vm.onClickOutside()

    expect(wrapper.vm.focused).toBeFalsy()
    expect(wrapper.vm.highlightIndex).toEqual(-1)
    expect(wrapper.vm.hoverIndex).toEqual(-1)
    expect(wrapper.vm.tokenIndex).toEqual(-1)
  })

  describe('with prop.open-on-focus', () => {
    it('should open when search field is focused', () => {
      expect(wrapper.vm.open).toBeFalsy()
      wrapper.find('[data-test-id="search"]').trigger('focus')
      expect(wrapper.vm.open).toBeTruthy()
    })
  })

  describe('with prop.open-on-arrow', () => {
    beforeEach(() => {
      wrapper = mount(Multiselect, { sync: false, propsData: { options: Cocktails, openOnFocus: false } })
    })

    it('should not open on focus alone', () => {
      wrapper.find('[data-test-id="search"]').trigger('focus')
      expect(wrapper.vm.open).toBeFalsy()
    })

    it('should open when key.down or key.up is pressed while focused', () => {
      wrapper.find('[data-test-id="search"]').trigger('focus')
      expect(wrapper.vm.open).toBeFalsy()
      wrapper.find('[data-test-id="search"]').trigger('keydown.down')
      expect(wrapper.vm.open).toBeTruthy()
    })
  })
})
