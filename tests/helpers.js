import { mount, shallowMount } from '@vue/test-utils'
import Multiselect from '@/multiselect.vue'

export default {
  setup: function(props, opts){
    props = props || {}
    opts = opts || {}

    const wrapper = mount(Multiselect, { sync: false, propsData: props })
    const options = wrapper.findAll(
      '[data-test-id="option"]:not([data-test-disabled])'
    )

    const selected = []

    if(opts.selected > 0){
      while(selected.length <= opts.selected){
        let option = options.at(Math.floor(Math.random() * options.length))
        if(!selected.includes(option)){
          selected.push(option)
        }
      }
    }

    return { wrapper, options, selected }
  },
  collect: function(options, count){
    const selected = []

    while(selected.length < count){
      let option = options.at(Math.floor(Math.random() * options.length))
      if(!selected.includes(option)){
        selected.push(option)
      }
    }

    if(count == 1){
      return selected[0]
    }
    return selected
  }
}
