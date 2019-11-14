<template>
  <q-page class="flex flex-center row">
    <div class="col-3">
      <ScriptList />
    </div>
    <div class="col-6">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="data" label="Data" />
        <q-tab name="training" label="Model Training" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="data"><SampleData/></q-tab-panel>

        <q-tab-panel name="training">
          <div class="row">
            <TrainingStepper />
            <div class="row col-12 justify-around">
              <GPUUtilization class="col-12" />
              <CPUUtilization class="col-12" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="col-3">
      <Results />
    </div>
  </q-page>
</template>

<script>
import CPUUtilization from "../components/CPUUtilization";
import GPUUtilization from "../components/GPUUtilization";
import Results from "../components/Results";
import SampleData from "../components/SampleData";
import ScriptList from "../components/ScriptList";
import TrainingStepper from "../components/TrainingStepper";
export default {
  name: "PageIndex",
  data(){
    return {
      tab:"data"
    }
  },
  components: {
    CPUUtilization,
    GPUUtilization,
    Results,
    SampleData,
    ScriptList,
    TrainingStepper
  },
  computed: {
    jobStatus() {
      return this.$store.state.JobStatus.jobStatus;
    }
  }
};
</script>
