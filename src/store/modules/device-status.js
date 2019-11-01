const state = {
    deviceStatus: {}
  }
  
  const mutations = {
    set(state, payload) {
      state[payload.state] = JSON.parse(payload.value)
    }
  }
  
  const actions = {
    set({ commit }, deviceStatus) {
      var payload = {
        state: "deviceStatus",
        value: deviceStatus
      }
      commit("set", payload)
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
  