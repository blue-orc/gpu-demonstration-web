<template>
  <div class="column">
    <CPUInfo/>
    <highcharts class="chart" :options="cpuChartOptions"/>
    <GPUInfo/>
    <highcharts class="chart" :options="gpuChartOptions"/>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import CPUInfo from "./CPUInfo";
import GPUInfo from "./GPUInfo";

export default {
  components: {
    highcharts: Chart,
    CPUInfo,
    GPUInfo
  },
  props:['GPUData', 'CPUData', 'ChartTitle'],
  data() {
    return {
      cpuChartOptions: {
          chart:{
              type: 'area',
              animation: false
          },
          title: {
              text: undefined
          },
          plotOptions:{
              series:{
                  marker: {
                      enabled: false
                  },
                  animation:false
              }
          },
          yAxis: {
              max:100,
              title: {
                text: "CPU"
              }
          },
          xAxis: {
              labels: {
                  enabled: false
              }
          },
        series: [
          {
            data: this.CPUData,
            showInLegend: false  
          }
        ]
      },
      gpuChartOptions: {
          chart:{
              type: 'area',
              animation: false
          },
          plotOptions:{
              series:{
                  marker: {
                      enabled: false
                  },
                  animation:false
              }
          },
          title:{
            text: undefined
          },
          yAxis: {
              max:100,
              title: {
                text: "GPU"
              }
          },
          xAxis: {
              labels: {
                enabled: false
              }
          },
        series: [
          {
            data: this.GPUData,
            showInLegend: false
          }
        ]
      }
    };
  }
};
</script>

<style>
.chart{
    height: 150px;
    width:500px
}
</style>