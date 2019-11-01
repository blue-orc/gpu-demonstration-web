<template>
  <q-page class="flex flex-center">
    <div class="row justify-center">
      <div class="col-12 row justify-center">
        Utilization
      </div>
      <div class="row">
        <div class="column items-center">
        <q-circular-progress
          :angle=180 
          show-value
          class="text-white"
          v-if="deviceStatus.Utilization" 
          size="90px" 
          center-color="grey-8"
          color="green"
          :value="deviceStatus.Utilization.GPU">
          {{deviceStatus.Utilization.GPU}}%
        </q-circular-progress>
        GPU
        </div>
        
        <div class="column items-center">
        <q-circular-progress 
          :angle=180
          show-value
          class="text-white"
          v-if="deviceStatus.Utilization" 
          size="90px" 
          center-color="grey-8"
          color="orange"
          :value="deviceStatus.Utilization.Memory">
          {{deviceStatus.Utilization.Memory}}%
        </q-circular-progress>
        Memory
        </div>
      </div>
      <div class="col-12">
        <q-list bordered separator>
          <q-item-label header>Current Processes</q-item-label>
          <q-item v-if="!deviceStatus.Processes || deviceStatus.Processes.length == 0">
            <q-item-section>None</q-item-section>
          </q-item>
          <div v-else>
            <q-item v-for="p in deviceStatus.Processes" :key="p.PID">
              <q-item-section>Name: {{p.Name}}</q-item-section>
              <q-item-section>Memory Used (MB): {{p.MemoryUsed}}</q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    deviceStatus() {
      return this.$store.state.DeviceStatus.deviceStatus
    }
  }
}
</script>
