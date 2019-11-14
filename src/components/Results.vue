<template>
  <q-table title="Results" :data="results" :columns="columns" row-key="name" />
</template>

<script>
export default {
  data() {
    return {
      columns: [
          {
          name: "script",
          field: "script",
          label: "Script",
          align: "center",
          sortable: true
        },
        {
          name: "processorType",
          field: "processorType",
          label: "Processor",
          align: "center",
          sortable: true
        },
        {
          name: "totalSeconds",
          field: "totalSeconds",
          label: "Total (s)",
          align: "center",
          sortable: true
        },
        {
          name: "trainingSeconds",
          field: "trainingSeconds",
          label: "Train (s)",
          align: "center",
          sortable: true
        },
        {
          name: "sqlSeconds",
          field: "sqlSeconds",
          label: "Data Query (s)",
          align: "center",
          sortable: true
        },

        {
          name: "accuracy",
          field: "accuracy",
          label: "Accuracy",
          align: "center"
        }
      ],
      results: []
    };
  },
  computed: {
    jobStatus() {
      return this.$store.state.JobStatus.jobStatus;
    }
  },
  watch: {
      jobStatus(val, old){
          if (val.Step === "Finished" && old.Step !== val.Step){
              var res = {
                  script:"sample",
                  processorType:"GPU",
                  totalSeconds: val.TotalTime,
                  trainingSeconds: val.TrainingTime,
                  sqlSeconds: val.SqlTime,
                  accuracy: 100
              }
              this.results.push(res)
          }
      }
  }
};
</script>

<style>
</style>