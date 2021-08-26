<template>
  <div style="display: inline-block; position: relative;">
    <div class="hidden-class"><slot></slot></div>
    <div
      id="my-table-header"
      :style="`width: ${width}px;overflow: hidden;`"
    >
      <table-header
        :store="store"
      />
    </div>
    <div
      :style="`width: ${width}px; height: ${height - headerH}px; overflow: scroll;`"
      @scroll="throttleHandleScroll"
    >
      <table-body
        :store="store"
      />
    </div>
    <div
      :style="`height: ${height - scrollXH}px`"
      :class="['my-table-fixed-left', {ismove: ismove}]"
    >
      <table-header
        :store="store"
        type="fixed"
      />
      <div
        id="my-table-body-fixed"
        :style="`height: ${height - headerH - scrollXH}px;overflow: hidden;`"
      >
        <table-body
          :store="store"
          type="fixed"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from './table-header'
import TableBody from './table-body'
import { throttle } from '@/utils/index'

export default {
  name: 'MyTable',
  components: {
    TableHeader,
    TableBody
  },
  props: {
    width: {
      type: [Number, String],
      default: function() {
        return 100;
      }
    },
    height: {
      type: [Number, String],
      default: function() {
        return 100;
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    this.store = this.createStore(this.data, this.width, this.height)
    return {
      throttleHandleScroll: throttle(this.handleScroll, 20),
      ismove: false,
      headerH: 0,
      scrollXH: 0
    }
  },
  computed: {
    column() {
      return this.$slots.default.map(item => item.data.attrs);
    },
    fixedCol() {
      return this.column.filter(item => !!item.fixed);
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.store.update(value, this.column, this.fixedCol);
      }
    }
  },
  created() {
    console.log(this.$slots.default);
    this.$nextTick(() => {
      const H = document.getElementById('my-table-header');
      console.log(H.clientHeight);
      this.headerH = H.clientHeight;

      this.scrollXH = 17; // 判断是否出现横向滚动条
    });
  },
  methods: {
    createStore(data, w, h) {
      console.log(this.column)
      return {
        id: 'my-table-' + ((Math.random()*10000) >> 1),
        data,
        column: this.column,
        fixedCol: this.fixedCol,
        w,
        h,
        update(data, column, fixedCol) { // 更新数据
          this.data = data;
          this.column = column || [];
          this.fixedCol = fixedCol || [];
        }
      }
    },
    handleScroll(e) {
      const header = document.getElementById('my-table-header');
      if (header.scrollLeft !== e.target.scrollLeft) header.scrollLeft = e.target.scrollLeft; // 固定表头同步

      const bodyFixed = document.getElementById('my-table-body-fixed');
      if (bodyFixed.scrollTop !== e.target.scrollTop) bodyFixed.scrollTop = e.target.scrollTop;

      if (e.target.scrollLeft) {
        this.ismove = true;
      } else {
        this.ismove = false;
      }
    }
  }
}
</script>

<style scoped>
  .hidden-class {
    display: none;
  }
  
</style>
<style>
  .my-table-header-td {
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
  }
  .my-table-body-td {
    border-bottom: 1px solid black;
    border-left: 1px solid black;
  }
  .my-table-body-td::after {
    content: '';
    display: block;
    top: 0;
    bottom: 0;
    right: 0;
    border-right: 1px solid black;
  }
  .my-table-gutter {
    width: 15px;
    border: 1px solid black;
    padding: 0;
  }
  .my-table-fixed-left {
    position: absolute;
    display: inline;
    left: 0;
    top: 0;
    background-color: #fff;
    overflow: hidden;
    border-right: 1px solid;
  }
  .my-table-fixed-left.ismove{
    box-shadow: 4px 0px 4px rgb(0 0 0 / 10%);
  }
</style>
