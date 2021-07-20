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
        @mouseout="handleShowItemOut"
        @mouseenter="handleCursor"
        @mouseleave="handleCursor"
      >
        <nav-item
          v-for="(item, index) in routes"
          :key="item.path"
          :ref="item.path"
          @click.native="handleClick(item.path, index)"
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
      <transition name="text-skip" style="pointer-events: none;">
        <div
          v-show="textShow"
          ref="text-translate"
          class="text-translate"
          style="pointer-events: none;"
        >
          {{ cursorContent }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import NavItem from './NavItem.vue'
import { throttle } from 'lodash'
import Vue from 'vue'

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
        opacity: '1',
        lineHeight: '100px',
        backgroundColor: 'thistle'
      },
      cursorRaw: {
        width: '0px',
        height: '0px',
        opacity: '1',
        lineHeight: '100px',
        backgroundColor: 'thistle'
      },
      cursorRepeat: {
        width: '60px',
        height: '60px',
        lineHeight: '60px',
        backgroundColor: '#2c3e50',
        mixBlendMode: 'difference'
      },
      textShow: false,
      activedPath: '/',
      activeIndex: -1,
      itemsParent: document.getElementsByClassName('nav-item-contain'),
      items: document.getElementsByClassName('nav-item-main')
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    activeRoute() {
      const mp = {};
      for (let key in this.routes) {
        mp[key] = false;
      }
      return mp;
    }
  },
  created() {
    // console.log(this.$router);
  },
  mounted() {

  },
  methods: {
    handleShowItem(e) {
      const event = e || window.event;
      if (event.fromElement && event.fromElement.className === 'nav-item-contain') {
        event.fromElement.style['opacity'] = '1';
        // 光标到激活位置，变小
        if (event.toElement && event.toElement.firstElementChild && event.toElement.firstElementChild.style.backgroundColor === 'thistle') {
          this.setCursor(this.cursorRepeat);
          this.textShow = false;
          this.cursorContent = '';
          // 从active route 变小的光标，到其他位置，光标恢复init大小
        } else if (event.toElement && event.toElement.className === 'nav-item-contain') {
          event.toElement.style['opacity'] = '0';
          this.setCursor(this.cursorInit, 'mixBlendMode');
          this.textShow = true;
          this.cursorContent = event.toElement.innerText || this.cursorContent; // 文字内容
        }
      } else if (event.toElement && event.toElement.className === 'nav-item-contain') {
        // 从空位置到激活位置
        if (event.toElement.firstElementChild && event.toElement.firstElementChild.style.backgroundColor === 'thistle') {
          console.log(22)
          this.setCursor(this.cursorRepeat);
          this.textShow = false;
          this.cursorContent = '';
        } else {
          this.setCursor(this.cursorInit);
          event.toElement.style['opacity'] = '0';
          this.textShow = true;
          this.cursorContent = event.toElement.innerText || this.cursorContent; // 文字内容
        }
      }
    },
    handleShowItemOut() {
      this.textShow = false;
    },
    handleCursor(e) {
      const event = e || window.event;
      if (!this.isCursor) {
        this.isCursor = true;
        event.target.addEventListener('mousemove', this.throttleOnMouseMove);
        const cursor = this.$refs['cursor-class'].style;
        if (!cursor.mixBlendMode) {
          for (const key in this.cursorInit) {
            cursor[key] = this.cursorInit[key];
          }
        }
      } else {
        this.isCursor = false;
        this.textShow = false;
        event.target.removeEventListener('mousemove', this.throttleOnMouseMove);
        for (const key in this.cursorRaw) {
          this.$refs['cursor-class'].style[key] = this.cursorRaw[key];
        }
      }
    },
    onMouseMove(e) {
      // 刚刚点击，光标消失
      if (this.$refs['cursor-class'].style.opacity === '0') {
        this.setCursor(this.cursorRepeat);
        this.$refs['cursor-class'].style.opacity = '1';
      }
      const event = e || window.event;
      this.$refs['cursor-class'].style.left = (event.pageX) + 'px';
      this.$refs['cursor-class'].style.top = (event.pageY) + 'px';
    },
    handleClick(path, index) {
      this.activeIndex = index;
      window.location.hash = '#' + path;
      window.event.target.firstElementChild.style.backgroundColor = 'thistle';
      index += ''
      this.cursorContent = ''; // 光标文字清空
      for (const i in this.items) {
        if (i !== index) {
          this.items[i].style ? this.items[i].style.backgroundColor = 'transparent' : '';
        } else {
          this.itemsParent[i].style.opacity = 1;
          this.$refs['cursor-class'].style.opacity = 0;
        }
      }
    },
    setCursor(obj, del) {
      for (const key in obj) {
        this.$refs['cursor-class'].style[key] = obj[key];
      }
      if (del) {
        Vue.delete(this.$refs['cursor-class'].style, del);
      }
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

  .text-skip-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>