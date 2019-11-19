import Vue from 'vue'
import Vuex from 'vuex'

import HighchartsVue from 'highcharts-vue'

import DeviceStatus from "./modules/device-status"
import JobStatus from "./modules/job-status"
import SampleData from "./modules/sample-data"
import Scripts from "./modules/scripts"


Vue.use(Vuex)
Vue.use(HighchartsVue)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  modules: {
    DeviceStatus,
    JobStatus,
    SampleData,
    Scripts
  }
})

