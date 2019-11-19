<template>
   <q-list bordered class="rounded-borders">
      <q-expansion-item
        v-for="(res, i) in results"
        :key="i + 'result'"
        expand-separator
        :label="res.script"
        :caption="res.processorType + ' - ' + parseFloat(res.totalSeconds).toFixed(2) + ' seconds - ' + res.time"
      >
        <q-card>
          <q-card-section>
            <p>SQL Query Time: {{res.sqlSeconds}}</p>
            <p>Training Time: {{res.trainingSeconds}}</p>
            <p>Accuracy: {{res.accuracy}}</p>
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