<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import websocket from "./utilities/websocket-utility"
export default {
  name: 'App',
  mounted() {
    websocket.connect()
  },
  beforeDestroy() {
    websocket.disconnect();
  }

}
</script>
