import api from "../../utilities/api-utility"

const state = {
    sampledata: []
}

const mutations = {
    set(state, payload) {
        state[payload.state] = payload.value
    }
}

const actions = {
    async getSampleData({ commit }, name) {
        var request = {
            controller: "sampledata",
            queryParameters:
                {
                    scriptName: name
                }
        }
        var res = await api.getNoAuth(request)
        console.log(res.status)
        if (res.status !== 200){
            return
        }
        console.log(res.data)
        var payload = {
            state: "sampledata",
            value: res.data
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
  