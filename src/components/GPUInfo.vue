<template>
<div class="row justify-center">
  <div class="text-grey-8">
    Nvidia {{gpuInfo.Model}}
  </div>
  </div>
</template>

<script>
export default {
  computed: {
    gpuInfo() {
      return this.$store.state.DeviceStatus.GPUInfo[0];
    }
  }
};
</script>

<style>
</style>