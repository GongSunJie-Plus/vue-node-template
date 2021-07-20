<template>
  <div class="hello">
    HelloWorld
  </div>
</template>

<script>
import { getStart, test } from '@/api/start'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      ws: null
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(1)
      // this.start()
    },
    start() {
      // if (this.ws) this.ws.close()

      // console.log('websocket start')

      // this.ws = new WebSocket('ws://127.0.0.1:5000/ws')
      // this.ws.onmessage = (e) => {
      //   let data = e.data
      //   console.log(data)
      // }
      // this.ws.onerror = (e) => {
      //   console.log('error', e)
      // }
      // this.ws.onopen = () => {
      //   console.log('websocket build')
      // }
      // this.ws.onclose = () => {
      //   console.log('close')
      //   this.ws 
      // }
      getStart().then(res => {
        console.log(res)
      })
      test({
        redirect: window.location.origin
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
