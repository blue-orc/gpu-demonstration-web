<template>
<div class="row justify-center">
  <div class="text-grey-8">
    {{cpuInfo.modelName}} {{cpuInfo.cores}} cores
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    cpuInfo() {
      return this.$store.state.DeviceStatus.CPUInfo;
    }
  }
};
</script>

<style>
</style>