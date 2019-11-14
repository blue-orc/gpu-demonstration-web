import api from "../../utilities/api-utility"

const state = {
    scripts: [],
    selectedScript:{}
}

const mutations = {
    set(state, payload) {
        state[payload.state] = payload.value
    }
}

const actions = {
    async getAll({ commit }) {
        var request = {
            controller: "script"
        }
        var res = await api.getNoAuth(request)
        if (res.status !== 200){
            return
        }
        var payload = {
            state: "scripts",
            value: res.data
        }
        commit("set", payload)
    },
    select({ commit }, script) {
        var payload = {
            state: "selectedScript",
            value: script
        };
        commit("set", payload);
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
  