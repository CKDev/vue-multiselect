# CKD Vue Multiselect

The aim of this component, like @ckd/vue-select, is to provide a simple but highly functional multiselect input. As a bit of history, the goal is always to implement something that a close as humanly possible mimics native input element functionality. That being said, here's what W3 Schools says about using the `multiple` attribute of native select elements:

```
Selecting multiple options vary in different operating systems and browsers:

    For windows: Hold down the control (ctrl) button to select multiple options
    For Mac: Hold down the command button to select multiple options

Because of the different ways of doing this, and because you have to inform the user that multiple selection is available, it is more user-friendly to use checkboxes instead.
```

So since W3 Schools isn't even going to encourage implementation of native multiple select functionality, a new approach was needed.

So why not just use vue-multiselect or some other existing vue based select component? Good question, and a valid one. Vue-multiselect is great, and if that's what you're familiar with or if it has the features you need, then go for it. As mentioned before, the goal of the CKD Multiselect is to keep it simple. Part of the reason for that is to avoid unnecessary complexities or unnecessary features. It was built with the idea that it could be extended and built upon to implement any features it's lacking. For example, vue-multiselect's "allow-empty" and "max" options are great, but I'm sure a large number of users don't require those features at all. CKD Multiselect doesn't implement those same features, but if needed the component could simply be extended and tweaked slightly to provide the same functionality. It's just that out of the box CKD Multiselect is simple, and functions in what one would hope is an intuitive way. That's the idea.

## Installation

```
yarn add @ckd/vue-multiselect@0.1.1-alpha.4
```

## Demo

A simple demo of several component implementations can be found in the packages /demo directory. It can be run using `yarn serve`

## Usage

Register the component for use in a Vue application

```
import Multiselect from '@ckd/vue-multiselect'
Vue.component('v-multiselect', Multiselect)
```

or, use UMD:

```
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/@ckd/vue-multiselect"></script>

<script>
new Vue({
  components: {
    VMultiselect: window['@ckd/vue-multiselect']
  }
}).$mount('#app')
</script>
```

Then, use the component in your markup
```
<v-multiselect v-model="selections" :options="options" :allow-suggest="true"></v-multiselect>
```

Options are always defined as an array of objects, where each object represents an option or option group, in the following format:

```
[
    {
        "label": "Option A",
        "value": 0
    },
    {
        "label": "Option B",
        "value": 1,
        "disabled": true,                                  // Disable the option
        "item": "<strong>Option B is not allowed</strong>" // Define the "item" key to style the look of the text when in an option component
    },
    {
        "label": "Option C",
        "options": [                                       // Providing an "options" key makes the option an optgroup
            {
                "label": "Option D",
                "value": 2
            }
        ]
    }
]
```

Things to note about the options input data.

In the case of options:
- Reserved keys for options are `label`, `value`, `item`, `disabled`, `options`, `selected`, and `state`
    - Any other keys defined are still valid, and will simply be passed through to the option components `option` prop.
    - The `state` key that appears on the resulting option object is itself a hash that holds data relating to the current state of the option, such as whether it is hovered/highlighted, it's index in the list, it's "depth" relative to any parent optgroups, etc.
- The bare minimum to have a functioning component is to provide the `label` and `value` keys.
- The difference between `label` and the optional `item` keys is in where each is used. Rendered options by default will display the value of `item` (which by default is just the value of `label`), but in selected "token" boxes, the `label` value will be used. Both support HTML markup.

In the case of optgroups:
- Any "option" that itself defines an `options` key becomes an optgroup. The `value` and `selected` keys are not needed for optgroups since they are irrelevant.
- Setting `disabled` on optgroups will also disable every child option & optgroup.

### Customizing Suggestion

The rendered suggestion by default is simply the defined option component with "Create **<Suggestion>**" as the `item` key, but it can very easily be customized by defining a "suggestion" slot in the component markup. The slot scope contains an object with a suggestion object on it, which is just a dynamically created option object with the current input text as the suggestion label and value. Example of customized suggestion option:

```
<v-multiselect :options="options" :allow-suggest="true">
    <div slot="suggestion" slot-scope="{ suggestion }">Insert {{suggestion.label}}</div>
</v-multiselect>
```

### Customizing Tokens

The rendered selection tokens are out of the box a plain div with the option label and a close icon that can be clicked to remove the selection. If you want to customize the look/behavior of tokens you can by just providing a token slot element in the component markup. The slot scope will include an object with both the option object and a remove function that can be called to remove the selected option.

```
<v-multiselect :options="options">
    <div slot="token" slot-scope="{ option, remove }" @click="remove()" v-html="`<strong>${option.item}</strong>`"></div>
</v-multiselect>
```

Both customized tokens and suggestion functionality is shown in the demo app (see: Demo)

## Options

CKD Multiselect supports the following options, all of which are passed as props on the component markup

| *Option*     | *Accepted Value* | *Default* | *Description*                                                                                                                                                                           |
|--------------|------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| openOnFocus  | Boolean          | `true`    | Opens the options dropdown when the text input field is focused. If `false`, the dropdown will only appear as the user types, and only if the input text matches an option in the list. |
| openOnArrow  | Boolean          | `true`    | Opens the dropdown when the up/down arrow key is pressed and the component currently has focus.                                                                                         |
| allowSuggest | Boolean          | `false`   | If the given input does not match an option in the dropdown, a suggested option will appear allowing the user to add their own option.                                                  |

Other permitted options inherited from @ckd/vue-select:

| *Option*    | *Accepted Value*   | *Default*      | *Description*                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|-------------|--------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options     | Array              | (empty array)  | The source of the select options. See Usage for details on how the array should be formatted.                                                                                                                                                                                                                                                                                                                                                       |
| placeholder | String             | (empty string) | Defines the placeholder text that appears in the text input field. The text input will be resized to fit the placeholder text automatically.                                                                                                                                                                                                                                                                                                        |
| size        | Number             | `400`          | The maximum height of the dropdown, in pixels. Depending on the available space on the screen at any given moment, the dropdown may appear smaller.                                                                                                                                                                                                                                                                                                 |
| disabled    | Boolean            | `false`        | Disables the input, as well as adds an `is-disabled` class to the components root element so it can be styled accordingly.                                                                                                                                                                                                                                                                                                                          |
| native      | Boolean / Function | `true`         | If `true`, the native input will be used only if a mobile browser is detected. If `false`, the native select input will never be used. If a function, the truthiness of the return value from that function will determine whether or not to use the native input. The function receives one argument, which is the value of `navigator.userAgent`, so you can write your own algorithm to determine whether or not to use the native select input. |
| selected    | String / Number    | `null`         | If defined, auto selects the option in the list with the matching value. If more than one option exists with the same value, the first will be selected.                                                                                                                                                                                                                                                                                            |
| option      | Vue Component      | VOption        | Allows overriding the rendered option component for each option in the dropdown, to further customize the markup/layout. See the package source's option.vue file to reference the current markup/attributes.                                                                                                                                                                                                                                       |
| optgroup    | Vue Component      | VOptgroup      | Allows overriding the rendered optgroup component for each "optgroup" in the dropdown. See the package source's optgroup.vue file to reference the current optgroup markup/attributes.                                                                                                                                                                                                                                                              |

## Tests

Tests are written with jest, and can be run with `yarn test`

## TODO

- Improve ADA, more aria-* and such
- Add autofocus functionality