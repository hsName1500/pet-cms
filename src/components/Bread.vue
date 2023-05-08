<template>
  <div id="container">
      <div id="d1"></div>
      <div id="d2"></div>
      <div id="d3"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  
  mounted() {
    var chartDom = document.getElementById("d3");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [0, 100],
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
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "套餐价格",
          left:30,
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
          data: ["狗狗洁牙套餐", "狗狗疫苗", "猫咪疫苗", "猫咪体验", "猫咪洗护", "猫咪疫苗",'狗狗驱虫','狗狗绝育'],
        },
        series: [
          {
            name: "价格",
            type: "bar",
            data: [478, 298, 238, 588, 40, 238,219,799],
          },
        ],
      };

      option && myChart.setOption(option);
      // 加载第一组数据
      var chartDom = document.getElementById("d1");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };

      option && myChart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
#container {
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
      }
      #d1 {
        position: absolute;
        /* background-color: antiquewhite; */
        top: 0;
        left: 0;
        width: 61%;
        height: 49%;
      }
      #d2 {
        position: absolute;
        /* background-color: burlywood; */
        top: 0;
        right: 0;
        width: 38%;
        height: 100%;
      }
      #d3 {
        position: absolute;
        /* background-color: cornflowerblue; */
        bottom: 0;
        left: 0;
        width: 61%;
        height: 49%;
      }
</style>