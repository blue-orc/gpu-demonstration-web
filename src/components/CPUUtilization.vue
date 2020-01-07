<template>
  <div>
      <div v-if="CPUMemoryUtilization.CPUPercent && CPUMemoryUtilization.CPUPercent.length > 0" class="row justify-around">
        <div class="column items-center">
          <q-circular-progress
            v-for="(cpu, i) in CPUPercentSorted"
            :key="i+'cpu'"
            :angle="180"
            show-value
            class="text-white"
            size="40px"
            center-color="grey-8"
            color="green"
            :value="cpu"
          >{{parseInt(cpu)}}%</q-circular-progress>CPU
        </div>
        <div class="column items-center">
        <q-circular-progress
            :angle="180"
            show-value
            class="text-white"
            size="90px"
            center-color="grey-8"
            color="orange"
            :value="MemoryUtilization"
          >{{parseInt(MemoryUtilization)}}%</q-circular-progress>Memory
        </div>
      </div>
  </div>
</template>

<script>

export default {

  computed: {
    CPUMemoryUtilization() {
      return this.$store.state.DeviceStatus.CPUMemoryUtilization;
    },
    CPUPercentSorted(){
        var cpus = this.CPUMemoryUtilization.CPUPercent
        cpus.sort(function(a,b){return b-a})
        return cpus.slice(0,3)
    },
    MemoryUtilization(){
        var total = parseFloat(this.CPUMemoryUtilization.Memory.total)
        var free = parseFloat(this.CPUMemoryUtilization.Memory.free)
        var used = total - free
        return(used / total) * 100
    }
  }
};
</script>

<style>
</style>