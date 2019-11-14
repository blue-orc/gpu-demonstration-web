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
            var end = data.indexOf(">")
            var body = data.substr(i + 1, end - i - 1)
            if (bodyType === "DeviceStatus") {
              var payload = {
                state: "GPUUtilization",
                value: body
              }
              store.dispatch("DeviceStatus/set", payload)
            } else if (bodyType === "CPUMemoryUtilization") {
              var payload = {
                state: "CPUMemoryUtilization",
                value: body
              }
              store.dispatch("DeviceStatus/set", payload)
            } else if (bodyType === "JobStatus") {
                store.dispatch("JobStatus/set", body)
            } else {
                return
            }

            data = data.substr(end+2, data.length)
            i = data.indexOf("\u0017")
        }
    }
  },
  disconnect() {
    conn.close()
  }
}
