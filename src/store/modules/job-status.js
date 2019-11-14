const state = {
    jobStatus: {}
  }
  
  const mutations = {
    set(state, payload) {
      state[payload.state] = JSON.parse(payload.value)
    }
  }
  
  const actions = {
    set({ commit }, jobStatus) {
      var payload = {
        state: "jobStatus",
        value: jobStatus
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
  