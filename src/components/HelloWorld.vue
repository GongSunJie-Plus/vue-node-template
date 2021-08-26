<template>
  <div class="hello">
    HelloWorld: socket{{ socketData }}
    <div v-inifite="handle" id="box" class="box">
      <div
        v-for="(item, index) in list"
        :key="'list' + index"
        class="item"
      >
        {{ item }}
      </div>
    </div>
    <div style="text-align: center;">
      <my-table
        :data="tableData"
        width="200"
        height="100"
      >
        <div
          lable="姓名"
          props="name"
          width="60"
          fixed="left"
        />
        <div
          lable="年龄"
          props="age"
          width="60"
        />
        <div
          lable="性别"
          props="sex"
          width="60"
        />
        <div
          lable="电话"
          props="phone"
          width="150"
        />
        <div
          lable="国籍"
          props="country"
          width="60"
        />
      </my-table>
    </div>
  </div>
</template>

<script>
import { getStart } from '@/api/start'
import MyTable from '@/components/MyTable/index.vue'

export default {
  name: 'HelloWorld',
  components: {
    MyTable
  },
  props: {
    msg: String
  },
  data() {
    return {
      list: ['a', 2, 3],
      ws: null,
      socketData: '',
      tableData: [
        {
          name: '张三',
          age:  12,
          sex: '男',
          phone: '4211231',
          country: '中国'
        },
        {
          name: '张三',
          age:  12,
          sex: '男',
          phone: '4211231',
          country: '中国'
        },
        {
          name: '张三',
          age:  12,
          sex: '男',
          phone: '4211231',
          country: '中国'
        },
        {
          name: '张三',
          age:  12,
          sex: '男',
          phone: '4211231',
          country: '中国'
        },
        {
          name: '张三',
          age:  12,
          sex: '男',
          phone: '4211231',
          country: '中国'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.start()
    },
    handle() {
      this.list.push(...['b', 'c', 'd']);
    },
    start() {
      if (this.ws) this.ws.close()

      console.log('websocket start')

      this.ws = new WebSocket('ws://127.0.0.1:5000/ws')
      this.ws.onmessage = (e) => {
        this.socketData = e.data
      }
      this.ws.onerror = (e) => {
        console.log('error', e)
      }
      this.ws.onopen = () => {
        console.log('websocket build')
      }
      this.ws.onclose = () => {
        console.log('close')
        this.ws 
      }

      getStart({data: '1'}).then(res => {
        console.log(res)
      })
    },
    getOffset(dom) {
      let res = dom.offsetTop;
      if (dom.offsetParent.tagName === 'HTML' || dom.offsetParent.tagName === 'BODY') {
        let parent = dom.parentNode;
        let parentOffset = parent.offsetTop;
        res -= parentOffset;
      }
      return res + dom.clientHeight;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  width: 100px;
  height: 150px;
  overflow: auto;
  position: relative;
}
  .item {
    width: 100px;
    height: 100px;
    background-color: thistle;
  }
</style>
