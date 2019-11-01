import Vue from 'vue'
import Vuex from 'vuex'

import DeviceStatus from "./modules/device-status"


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  modules: {
    DeviceStatus
  }
})

