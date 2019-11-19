<template>
  <div class="row justify-center">
    <div class="q-pt-lg justify-center" v-if="!sampleData || sampleData.length === 0">
        <span class="text-h5">Please Select a Use Case</span>
    </div>
    <q-table
      class="col-12"
      v-else
      flat
      virtual-scroll
      table-style="max-height: 600px"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :data="sampleData"
      :columns="columns"
      hide-bottom
      row-key="name"
    />
  </div>
</template>

<script>
import objectUtility from "../utilities/object-utility"
export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 0
      }
    };
  },
  computed: {
    columns() {
      var cols = [];
      if (this.sampleData.length && this.sampleData.length > 0) {
        for (var key of Object.keys(this.sampleData[0])) {
          if (key === "__index") {
            continue;
          }
          var col = {
            name: key,
            field: key,
            label: key,
            align: "center",
            sortable: true
          };
          cols.push(col);
        }
      }
      return cols;
    },
    sampleData() {
      return this.$store.state.SampleData.sampledata;
    },
    selectedScript() {
      return this.$store.state.Scripts.selectedScript;
    }
  },
  created(){
      if(!objectUtility.IsNullOrEmpty(this.selectedScript)){
          this.$store.dispatch("SampleData/getSampleData", this.selectedScript.Name);
      }
  },
  watch: {
    selectedScript(val) {
      if (val.ID !== 0) {
        this.$store.dispatch("SampleData/getSampleData", val.Name);
      }
    }
  }
};
</script>

<style>
</style>