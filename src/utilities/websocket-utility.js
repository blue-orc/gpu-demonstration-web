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
        var data = evt.data
        var i = data.indexOf("\u0017")
        while(i != -1){
            var bodyType = data.substr(0, i)
            var end = data.indexOf("\u0019")
            var body = data.substr(i + 1, end - 1)

            if (i > 0 && bodyType === "DeviceStatus") {
                console.log(bodyType)
                console.log(body)
                store.dispatch("DeviceStatus/set", body)
              } else {
                console.log(bodyType)
                  console.log(body)
              }

            data = data.substr(end, data.length)
            i = data.indexOf("\u0017")
        }
    }
  },
  disconnect() {
    conn.close()
  }
}
