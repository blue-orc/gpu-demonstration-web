<template>
  <div>
    <q-table
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