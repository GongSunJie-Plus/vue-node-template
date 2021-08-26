// export const debounce = function(fn, wait) {
//   let timer = null;
//   return function() {

//   }
// }

export const throttle = function(fn, wait) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, wait)
    }
  }
}
