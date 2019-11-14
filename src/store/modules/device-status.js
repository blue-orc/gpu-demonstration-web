const state = {
    GPUUtilization: {},
    CPUMemoryUtilization: {}
  }
  
  const mutations = {
    set(state, payload) {
      state[payload.state] = JSON.parse(payload.value)
    }
  }
  
  const actions = {
    set({ commit }, payload) {
      var payload = {
        state: payload.state,
        value: payload.value
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
  