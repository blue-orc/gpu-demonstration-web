<template>
  <div>
      <div class="col-12 row justify-center">
        Utilization
      </div>
      <div class="row justify-around">
        <div class="column items-center">
        <q-circular-progress
          :angle=180 
          show-value
          class="text-white"
          v-if="GPUUtilization.Utilization" 
          size="90px" 
          center-color="grey-8"
          color="green"
          :value="GPUUtilization.Utilization.GPU">
          {{GPUUtilization.Utilization.GPU}}%
        </q-circular-progress>
        GPU
        </div>
        
        <div class="column items-center">
        <q-circular-progress 
          :angle=180
          show-value
          class="text-white"
          v-if="GPUUtilization.Utilization" 
          size="90px" 
          center-color="grey-8"
          color="orange"
          :value="GPUUtilization.Utilization.Memory">
          {{GPUUtilization.Utilization.Memory}}%
        </q-circular-progress>
        Memory
        </div>
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        GPUUtilization() {
        return this.$store.state.DeviceStatus.GPUUtilization
        }
    }
}
</script>

<style>

</style>