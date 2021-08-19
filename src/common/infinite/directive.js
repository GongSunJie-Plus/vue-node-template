// 通过滚动区域最后一个元素，计算滚动区域高度
// 滚动区域高度 = scrollTop + clientHeight

const bind = function(el, handle) {
  if (typeof handle !== 'function') handle = () => {};
  el.addEventListener('scroll', () => {
    const scrollHeight = el.scrollHeight;
    console.log(scrollHeight, el.scrollTop, el.clientHeight);
    if (scrollHeight === el.scrollTop + el.clientHeight) {
      handle();
    }
  })
}

export default bind
