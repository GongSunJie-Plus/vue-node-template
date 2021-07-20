<template>
  <div class="nav-item-contain">
    <div class="nav-item-main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import { throttle } from 'lodash'

export default {
  name: 'NavItem',
  data() {
    return {
      isInner: false
    }
  },
  methods: {

  }
}
</script>

<style scoped>
  .nav-item-contain {
    display: inline-block;
    cursor: none;
    padding: 30px;
    width: 120px;
    height: 120px;
    background-color: transparent;
  }

  .nav-item-main {
    height: 100px;
    width: 100px;
    line-height: 100px;
    text-align: center;
    pointer-events: none;
    border-radius: 50%;
    background-color: transparent;
    transition: backgroundColor 0.5 linear;
  }
</style>