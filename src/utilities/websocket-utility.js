import store from "../store/index"
var conn

export default {
  connect() {
    conn = new WebSocket(process.env.VUE_APP_WEBSOCKET_URI)
    conn.onclose = function(evt) {
      console.log(evt.code)
      console.log(evt.reason)
      console.log(JSON.stringify(evt))
    }
    conn.onmessage = function(evt) {
      var bodyTypeEndIndex = evt.data.indexOf("\u0017")
      var bodyType = evt.data.substr(0, bodyTypeEndIndex)
      var body = evt.data.substr(bodyTypeEndIndex + 1, evt.data.length - 1)
      console.log(body)
      if (bodyType === "DeviceStatus") {
        store.dispatch("DeviceStatus/set", body)
      }
    }
  },
  disconnect() {
    conn.close()
  }
}
