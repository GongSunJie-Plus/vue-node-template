import bind from './directive'

export default {
  install: function(Vue) {
    Vue.directive('inifite' , {
      inserted: function(el, binding) {
        bind(el, binding.value);
      }
    })
  }
}
