<template>
  <div class="nav-item-contain">
    <div
      ref="nav-item-area"
      class="nav-item-area"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div
        ref="origin-box"
        class="origin-box"
      >
        <slot></slot>
      </div>
    </div>
    <div
      v-show="isInner"
      ref="cursor-box"
      class="cursor-box"
    >
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
    onMouseEnter() {
      // console.log(this.$refs['nav-item-area'].offsetTop, this.$refs['nav-item-area'].offsetLeft, this.$refs['nav-item-area'].clientHeight, this.$refs['nav-item-area'].clientWidth)
      // console.log(e.pageX, e.pageY)
      this.$refs['origin-box'].style.visibility = 'hidden'
      this.$refs['origin-box'].style.opacity = 0
      this.$refs['origin-box'].style.transform = 'translateY(-20px)'

      this.isInner = true

      this.$refs['nav-item-area'].addEventListener('mousemove', this.onMouseMove)

      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs['cursor-box'].style.opacity = 1
          this.$refs['cursor-box'].style.width = '100px'
          this.$refs['cursor-box'].style.height = '100px'
        }, 10)
      })
    },
    onMouseLeave(e) {
      console.log(this.$refs['nav-item-area'].offsetTop, this.$refs['nav-item-area'].offsetLeft, this.$refs['nav-item-area'].clientHeight, this.$refs['nav-item-area'].clientWidth)
      console.log(e.pageX, e.pageY)
      this.$refs['origin-box'].style.visibility = 'visible'
      this.$refs['origin-box'].style.opacity = 1
      this.$refs['origin-box'].style.transform = 'translateY(0px)'
      if (this.$refs['nav-item-area'].clientHeight <= e.pageY) {
        this.$refs['cursor-box'].style.opacity = 0
        this.$refs['cursor-box'].style.width = '0px'
        this.$refs['cursor-box'].style.height = '0px'
      } else {
        this.isInner = false
      }
      this.$refs['nav-item-area'].removeEventListener('mousemove', this.onMouseMove)
    },
    onMouseMove(e) {
      const event = e || window.ev
      this.$refs['cursor-box'].style.left = event.pageX + 'px'
      this.$refs['cursor-box'].style.top = event.pageY + 'px'
    }
  }
}
</script>

<style scoped>
  .nav-item-contain {
    display: inline-block;
    cursor: none;
  }

  .nav-item-area {
    padding: 50px;
  }

  .origin-box {
    opacity: 1;
    transition: opacity 0.1s linear, transform 0.1s linear, visibility 0s linear;
  }

  .cursor-box {
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: turquoise;
    width: 0px;
    height: 0px;
    opacity: 0;
    border-radius: 50%;
    pointer-events: none;
    text-align: center;
    line-height: 100px;
    transition: opacity 0.2s linear, width 0.2s linear, height 0.2s linear;
  }
</style>