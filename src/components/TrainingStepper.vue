<template>
  <div>
    <div class="row justify-between">
        <span>{{selectedScript.Name}} on {{selectedScript.Processor}}</span>
        <q-btn label="Run" color="primary" @click="startJob(selectedScript.ID)"/>
    </div>
    <q-stepper
      v-model="step"
      color="primary"
      horizontal
      alternative-labels
      flat
      animated
    >
        <q-step
            :name="1"
            title="Connecting to Oracle DB"
            :done="step > 1"
        >
            Establishing a conection to the Oracle Autonomous Data Warehouse (ADW)
        </q-step>

        <q-step
            :name="2"
            title="Querying Data"
            :done="step > 2"
        >
            The dataset that will be used to train the model is being retrieved from the Oracle Autonomous Data Warehouse (ADW)
        </q-step>

        <q-step
            :name="3"
            title="Preparing the Model"
            :done="step > 3"
        >
            The data is being transformed into a tensor and initialized for the processor
        </q-step>

        <q-step
            :name="4"
            title="Training the Model"
            :done="step > 4"
        >
            <q-linear-progress
                key="lg"
                size="lg"
                :value="percentComplete"
                color="primary"
            />
            The model is being trained by continually cycling over the entire dataset for {{parseInt(jobStatus.Epochs).toLocaleString('en')}} epochs
        </q-step>
    </q-stepper>
  </div>
</template>
<script>
import api from "../utilities/api-utility"
export default {
  data () {
    return {
      step: 0
    }
  },
  computed:{
      percentComplete(){
          var pctComplete = this.$store.state.JobStatus.jobStatus.PercentComplete
          if (this.jobStatus.Step === "Finished"){
              pctComplete = 100
          }
          return parseFloat(pctComplete) / 100
      },
      jobStatus(){
          return this.$store.state.JobStatus.jobStatus
      },
      selectedScript(){
          return this.$store.state.Scripts.selectedScript
      }
  },
  watch:{
      jobStatus(val, old) {
          if (val.Step === "Connecting to Oracle DB") {
              this.step = 1
          } else if (val.Step === "Querying data") {
              this.step = 2
          } else if (val.Step === "Preparing model") {
              this.step = 3
          } else if (val.Step === "Training Model") {
              this.step = 4
          } else if (val.Step === "Finished") {
              this.step = 0
          }
      }
  },
  methods:{
      async startJob(id){
            var request = {
                controller: "pythonJobRunner",
                queryParameters: {
                    scriptID: id
                }
            }
            await api.getNoAuth(request)
        }
  }
}
</script>