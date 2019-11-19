<template>
  <q-page class="flex flex-top row q-py-xl">
    <div class="col-3 q-px-md">
      <ScriptList />
    </div>
    <div class="col-6 q-px-md">
      <q-tabs
        v-model="tab"
        dense
        class="text-primary"
        active-color="secondary"
        indicator-color="secondary"
        align="justify"
        size="50"
        narrow-indicator
      >
        <q-tab name="data" class="text-h5 text-weight-light text-capitalize q-py-sm">Data</q-tab>
        <q-tab name="training" class="text-h5 text-weight-light text-capitalize q-py-sm">Model Training</q-tab>
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="data"><SampleData/></q-tab-panel>

        <q-tab-panel name="training">
          <div class="row justify-center">
            <TrainingStepper />
            <UtilizationGraph 
              :GPUData="gpuUtilizationData"
              :CPUData="cpuUtilizationData"
            />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="col-3 q-px-md">
      <Results />
    </div>
  </q-page>
</template>

<script>
import UtilizationGraph from "../components/UtilizationGraph"
import Results from "../components/Results";
import SampleData from "../components/SampleData";
import ScriptList from "../components/ScriptList";
import TrainingStepper from "../components/TrainingStepper";
export default {
  title: "Oracle Cloud Compute Demonstration",
  name: "PageIndex",
  data(){
    return {
      tab:"data",
      // :(
      gpuUtilizationData: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      cpuUtilizationData: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],      
      graphWrite: ''
    }
  },
  components: {
    Results,
    SampleData,
    ScriptList,
    TrainingStepper,
    UtilizationGraph
  },
  computed: {
    jobStatus() {
      return this.$store.state.JobStatus.jobStatus;
    },
    CPUMemoryUtilization() {
      return this.$store.state.DeviceStatus.CPUMemoryUtilization;
    },
    CPUPercentSorted(){
      var cpus = this.CPUMemoryUtilization.CPUPercent
      if (!cpus){
        return
      }
      cpus.sort(function(a,b){return b-a})
      return cpus.slice(0,3)
    },
    GPU() {
      if (this.$store.state.DeviceStatus.GPUUtilization.Utilization){
        return this.$store.state.DeviceStatus.GPUUtilization.Utilization.GPU
      }
    },
    CPU(){
      if(this.CPUPercentSorted && this.CPUPercentSorted.length > 0){
        return this.CPUPercentSorted[0]
      }
    },
    Processor(){
      return this.$store.state.Scripts.processor
    },
    utilizationGraphTitle(){
      return this.Processor + ' Utilization'
    }
  },
  watch:{
    GPU(val){
      this.gpuUtilizationData.push(val)
    },
    CPU(val){
      this.cpuUtilizationData.push(val)
    }
  },
  created(){
    this.write()
  },
  beforeDestroy () {
    clearInterval(this.graphWrite)
  },
  methods:{
    write: function(){
      this.graphWrite = setInterval(() => {
        this.gpuUtilizationData.push(this.gpuUtilizationData[this.gpuUtilizationData.length -1])
        this.cpuUtilizationData.push(this.cpuUtilizationData[this.cpuUtilizationData.length -1])
        while(this.gpuUtilizationData.length > 50) {
          this.gpuUtilizationData.shift()
        }
        while(this.cpuUtilizationData.length > 50) {
          this.cpuUtilizationData.shift()
        }
      }, 1000)
    }
  }
};
</script>

<style lang="stylus" scoped>
.tab {
  padding:30px;
}
</style>
