<template>
  <div>
    <div id="main" ref="chart" style="width: 100%; height: 376px;"></div>
  </div>
</template>

<script>

export default {
  mounted() {
    this.getEchartData();
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart;
      if (chart) {
        // const myChart = this.$echarts.init(chart);
        const myChart = this.$echarts.init(document.getElementById('main'));
        const option = {
          animationDuration: 3000,
          xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {},
          series: [
            {
              type: "bar",
              data: [23, 24, 18, 25, 27, 28, 25],
            },
          ],
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