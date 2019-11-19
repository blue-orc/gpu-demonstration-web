<template>
  <div class="row justify-center">
    <div class="row justify-around items-center col-12">
      <q-input outlined v-model="epochs" label="Iterations"></q-input>
      <div v-if="objectUtility.IsNullOrEmpty(selectedScript)">
          <span class="text-h5">Please Select a Use Case</span>
      </div>
      <div v-else class="q-gutter-x-md">
        <span class="text-body1">Run using:</span>
        <q-btn label="cpu" color="secondary" @click="startJob('CPU', selectedScript.Name)" />
        <q-btn label="gpu" color="secondary" @click="startJob('GPU', selectedScript.Name)" />
      </div>
    </div>
    <q-stepper
      v-model="step"
      horizontal
      alternative-labels
      flat
      animated
      active-color="secondary"
      inactive-color="primary"
      active-icon="loop"
      transition-next="slide-down"
    >
      <q-step
        :name="1"
        title="Querying Oracle ADW"
        :done="step > 1"
      >The dataset that will be used to train the model is being retrieved from the Oracle Autonomous Data Warehouse (ADW)</q-step>

      <q-step
        :name="2"
        title="Preparing"
        :done="step > 2"
      >The data is being transformed into a tensor and initialized for the processor</q-step>

      <q-step :name="3" title="Training" :done="step > 3">
        <q-linear-progress key="lg" size="lg" :value="percentComplete" color="secondary" />
        The model is being trained by continually cycling over the dataset for {{parseInt(jobStatus.Epochs).toLocaleString('en')}} iterations
      </q-step>

      <q-step
        :name="4"
        title="Testing"
        :done="step > 4"
      >The model is being tested for accuracy</q-step>
    </q-stepper>
  </div>
</template>
<script>
import api from "../utilities/api-utility";
import objectUtility from "../utilities/object-utility";
export default {
  data() {
    return {
      step: 0,
      epochs: 25000,
      objectUtility: objectUtility
    };
  },
  computed: {
    percentComplete() {
      var pctComplete = this.$store.state.JobStatus.jobStatus.PercentComplete;
      if (this.jobStatus.Step === "Finished") {
        pctComplete = 100;
      }
      return parseFloat(pctComplete) / 100;
    },
    jobStatus() {
      return this.$store.state.JobStatus.jobStatus;
    },
    selectedScript() {
      return this.$store.state.Scripts.selectedScript;
    }
  },
  watch: {
    jobStatus(val, old) {
      if (val.Step === "Connecting to Oracle DB") {
        this.step = 1;
      } else if (val.Step === "Querying data") {
        this.step = 1;
      } else if (val.Step === "Preparing model") {
        this.step = 2;
      } else if (val.Step === "Training Model") {
        this.step = 3;
      } else if (val.Step === "Test") {
        this.step = 4;
      } else if (val.Step === "Finished") {
        this.step = 0;
      }
    }
  },
  methods: {
    async startJob(processor, name) {
      var scripts = this.$store.state.Scripts.scripts;
      var filtered = scripts.filter(x => x.Name === name);
      filtered = filtered.filter(x => x.Processor === processor);
      if (filtered.length === 0) {
        return;
      }
      this.$store.dispatch("Scripts/setProcessor", processor);
      var request = {
        controller: "pythonJobRunner",
        queryParameters: {
          scriptID: filtered[0].ID,
          epochs: this.epochs
        }
      };
      await api.getNoAuth(request);
    }
  }
};
</script>