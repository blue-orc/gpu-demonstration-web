import api from "../../utilities/api-utility"

const state = {
    GPUUtilization: {},
    CPUMemoryUtilization: {},
    CPUInfo: {},
    GPUInfo: {}
  }
  
  const mutations = {
    set(state, payload) {
      state[payload.state] = JSON.parse(payload.value)
    },
    setObject(state, payload) {
      state[payload.state] = payload.value
    }
  }
  
  const actions = {
    set({ commit }, payload) {
      var payload = {
        state: payload.state,
        value: payload.value
      }
      commit("set", payload)
    },
    async getCPUGPUInfo({ commit }) {
      var gpuReq = {
        controller: "/devicemonitor/gpu"
      }
      var res = await api.getNoAuth(gpuReq)
      if (res.status === 200){
        var payload = {
          state: "GPUInfo",
          value: res.data
        }
        commit("setObject", payload)
      }
      
      var cpuReq = {
        controller: "/devicemonitor/cpu"
      }
      res = await api.getNoAuth(cpuReq)
      if (res.status === 200){
        var cpuInfo = {
          cores: res.data.length,
          modelName: res.data[0].modelName,
          mhz: res.data[0].mhz
        }
        payload = {
          state: "CPUInfo",
          value: cpuInfo
        }
        console.log(cpuInfo)
        commit("setObject", payload)
      }
    }
  }
  
  const getters = {
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
  