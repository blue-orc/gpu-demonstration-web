const state = {
    epochs: 15000
}

const mutations = {
    set(state, payload) {
        state[payload.state] = payload.value
    }
}

const actions = {
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
    