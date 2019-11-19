<template>
   <q-list separator>
     <q-item-label header class="text-primary text-h5 text-weight-light">Results</q-item-label>
     <q-separator/>
      <q-expansion-item
        v-for="(res, i) in results"
        :key="i + 'result'"
        expand-separator
        class="text-body1"
        :label="res.processorType + ' - ' + parseFloat(res.totalSeconds).toFixed(2) + ' seconds - ' + res.time"
      >
        <q-card>
          <q-card-section class="text-body2">
            <div class="row q-py-xs justify-between"><span>Use Case:</span> <span>{{res.script}}</span></div>
            <div class="row q-py-xs justify-between"><span>Epochs:</span> <span>{{parseInt(res.epochs).toLocaleString('en')}}</span></div>
            <div class="row q-py-xs justify-between"><span>SQL Query Time:</span> <span>{{res.sqlSeconds}}s</span></div>
            <div class="row q-py-xs justify-between"><span>Training Time:</span> <span>{{res.trainingSeconds}}s</span></div>
            <div class="row q-py-xs justify-between"><span>Accuracy:</span> <span> {{res.accuracy}}</span></div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
   </q-list>
</template>

<script>
export default {
  data() {
    return {
      results: []
    };
  },
  computed: {
    jobStatus() {
      return this.$store.state.JobStatus.jobStatus;
    }
  },
  methods:{
    getFormattedTime(){
      var date = new Date()
      var h = date.getHours()
      var ampm = "AM"
      if (h > 12){
        h = h-12
        ampm = "PM"
      }
      var res = h + ":" + date.getMinutes().toString().padStart(2, 0) + ":" + date.getSeconds().toString().padStart(2, 0) + " " + ampm
      return res
    }
  },
  watch: {
      jobStatus(val, old){
          if (val.Step === "Finished" && old.Step !== val.Step){
              var res = {
                  script: val.ScriptName,
                  processorType: val.Processor,
                  totalSeconds: val.TotalTime,
                  trainingSeconds: val.TrainingTime,
                  sqlSeconds: val.SqlTime,
                  epochs: val.Epochs,
                  accuracy: parseFloat(val.Accuracy).toFixed(2) + "%",
                  time: this.getFormattedTime()
              }
              this.results.unshift(res)
          }
      }
  }
};
</script>

<style>
</style>