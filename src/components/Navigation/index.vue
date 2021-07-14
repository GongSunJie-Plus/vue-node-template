<template>
  <div class="app-contain-navigation">
    <div class="logo-box">
      <img
        src="@/assets/logo.png"
        style="width: 100%; height: 100%;"
      >
    </div>
    <div style="display: flex;">
      <div
        ref="nav-item-contain"
        style="height:100%;"
        @mouseover="handleShowItem"
        @mouseout="handleShowItem"
        @mouseenter="handleCursor"
        @mouseleave="handleCursor"
      >
        <nav-item
          v-for="item in routes"
          :key="item.path"
        >
          {{ item.meta.title }}
        </nav-item>
      </div>
      <div ref="right-contain" style="margin-left: 50px;display:inline;" />
    </div>
    <div
      ref="cursor-class"
      class="cursor-class"
    >
      <div>
        {{ cursorContent }}
      </div>
    </div>
  </div>
</template>

<script>
import NavItem from './NavItem.vue'
import { throttle } from 'lodash'

export default {
  name: 'Navigation',
  components: {
    NavItem
  },
  data() {
    return {
      isCursor: false,
      throttleOnMouseMove: throttle(this.onMouseMove, 16),
      cursorContent: '',
      cursorInit: {
        width: '100px',
        height: '100px',
        opacity: '1'
      },
      cursorRaw: {
        width: '0px',
        height: '0px',
        opacity: '1'
      }
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes
    }
  },
  created() {
    console.log(this.$router)
  },
  mounted() {

  },
  methods: {
    handleShowItem(e) {
     const event = e || window.event;
     if (event.fromElement && event.fromElement.className === 'nav-item-contain') {
       event.fromElement ? event.fromElement.style['opacity'] = '1' : '';
       event.toElement ? event.toElement.style['opacity'] = '0' : '';
     }

     if (event.toElement && event.toElement.className === 'nav-item-contain') {
       event.toElement ? event.toElement.style['opacity'] = '0' : '';
       this.cursorContent = event.toElement.innerText; // 文字内容
     } else {
       event.fromElement ? event.fromElement.style['opacity'] = '1' : '';
       event.toElement ? event.toElement.style['opacity'] = '1' : '';
       this.cursorContent = '';
     }
    },
    handleCursor(e) {
      const event = e || window.event;
      if (!this.isCursor) {
        this.isCursor = true;
        event.target.addEventListener('mousemove', this.throttleOnMouseMove)
        for (const key in this.cursorInit) {
          this.$refs['cursor-class'].style[key] = this.cursorInit[key];
        }
      } else {
        this.isCursor = false;
        event.target.removeEventListener('mousemove', this.throttleOnMouseMove)
        for (const key in this.cursorRaw) {
          this.$refs['cursor-class'].style[key] = this.cursorRaw[key];
        }
      }
    },
    onMouseMove(e) {
      const event = e || window.event;
      this.$refs['cursor-class'].style.left = (event.pageX) + 'px';
      this.$refs['cursor-class'].style.top = (event.pageY) + 'px';
    }
  }
}
</script>

<style scoped>
  .app-contain-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: transparent;
  }

  .logo-box {
    width: 100px;
    height: 100px;
  }

  .cursor-class {
    position: absolute;
    text-align: center;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background-color: thistle;
    pointer-events: none;
    line-height: 100px;
    opacity: 0;
    /* 光标始终在圆心 */
    transform: translate(-50%, -50%);
    transition: width 0.2s linear, height 0.2s linear;
  }
</style>