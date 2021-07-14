<template>
  <div class="nav-item-contain">
    <slot></slot>
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
    padding: 50px;
  }
</style>