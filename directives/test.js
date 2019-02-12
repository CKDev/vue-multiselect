export default (el, binding) => {
  if(process.env.NODE_ENV === 'test'){
    Object.keys(binding.value).forEach(value => {
      if(binding.value[value]){
        el.setAttribute(`data-test-${value}`, binding.value[value])
      }else{
        el.removeAttribute(`data-test-${value}`)
      }
    })
  }
}
