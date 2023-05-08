<template>
  <div>
    <div id="container">
      <div id="d2"></div>
      <div id="d3"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "../assets/westeros.js";
export default {
  mounted() {
    var chartDom = document.getElementById("d3");
    var myChart = echarts.init(chartDom, "westeros");
    var option;

    option = {
      title: {
        text: "热门套餐",
        left: 30,
      },
      legend: {
        top: "bottom",
      },

      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [0, 80],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [
            { value: 40, name: "狗狗洁牙套餐" },
            { value: 38, name: "狗狗疫苗" },
            { value: 32, name: "猫咪疫苗" },
            { value: 30, name: "猫咪体验" },
            { value: 28, name: "猫咪洗护" },
            { value: 26, name: "猫咪疫苗" },
            { value: 22, name: "狗狗驱虫" },
            { value: 18, name: "狗狗绝育" },
          ],
        },
      ],
    };

    option && myChart.setOption(option);

    // 加载第二组数据
    var chartDom = document.getElementById("d2");
    var myChart = echarts.init(chartDom, "westeros");
    var option;

    option = {
      title: {
        text: "套餐价格",
        left: 30,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        right: 10,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: [
          "狗狗洁牙套餐",
          "狗狗疫苗",
          "猫咪疫苗",
          "猫咪体验",
          "猫咪洗护",
          "猫咪疫苗",
          "狗狗驱虫",
          "狗狗绝育",
        ],
      },
      series: [
        {
          name: "价格",
          type: "bar",
          data: [478, 298, 238, 588, 40, 238, 219, 799],
        },
      ],
    };

    option && myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
#container {
  display: flex;
}
#d3 {
  width: 500px;
  height: 500px;
  margin-left: 100px;
}
#d2 {
  width: 500px;
  height: 500px;
}
</style>
