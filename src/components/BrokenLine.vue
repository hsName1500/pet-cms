<template>
  <div>
    <div ref="chart2" style="width: 100%; height: 376px;"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getEchartData2();
  },
  methods: {
    getEchartData2() {
      const chart2 = this.$refs.chart2;
      if (chart2) {
        const myChart = this.$echarts.init(chart2);
        const option = {
          animationDuration: 3000,
          xAxis: {
            data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {},
  series: [
    {
      data: [10, 22, 28, 23, 19],
      type: 'line',
      label: {
        show: true,
        position: 'bottom',
        textStyle: {
          fontSize: 20
        },
      }
    }
  ]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>