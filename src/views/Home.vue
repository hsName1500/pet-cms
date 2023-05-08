<template>
  <div v-if="$route.meta.tb" style="box-sizing: border-box">
    <div class="echart" id="echart">
      <!-- 头部盒子 -->
      <div class="header">
        <el-button
          @click="goNav"
          style="
            color: red;
            background-color: #0a153b;
            border: none;
            margin: 0 auto;
          "
          >进入管理台</el-button
        >
        <h3>萌宠医院-数据大屏</h3>

        <div class="showTime">{{ currentTime }}</div>
      </div>

      <!-- 页面主体部分 -->
      <!-- 左边盒子 -->
      <section class="mainbox">
        <div class="column">
          <div class="panel bar">
            <h2>宠主选择宠物医院渠道占比</h2>
            <div class="chart" id="chart-1">图表</div>
            <div class="panel-footer"></div>
          </div>
          <div class="panel line">
            <h2>每日人流量分布情况</h2>
            <div class="chart" id="chart-2">图表</div>
            <div class="panel-footer"></div>
          </div>
          <div class="panel pie">
            <h2>养宠年龄段占比</h2>
            <div class="chart" id="chart-3">图表</div>
            <div class="panel-footer"></div>
          </div>
        </div>
        <!-- 中间盒子 -->
        <div class="column">
          <!-- no模块制作 -->
          <div class="on">
            <div class="no-hd">
              <ul>
                <li>{{ this.num1 }}</li>
                <li>{{ this.num2 }}</li>
              </ul>
            </div>
            <div class="on-bd">
              <ul>
                <li>狗狗就诊数量</li>
                <li>猫猫就诊数量</li>
              </ul>
            </div>
          </div>
          <!-- 地图模块 -->
          <div class="map">
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
            <div class="chart1" id="chart1" style="height: 750px">地图模块</div>
          </div>
        </div>

        <!-- 右边盒子 -->
        <div class="column">
          <div class="panel bar">
            <h2>宠主选择宠物医院医生因素占比</h2>
            <div class="chart" id="chart-4">图表</div>
            <div class="panel-footer"></div>
          </div>
          <div class="panel line">
            <h2>每周人流量分布情况</h2>
            <div class="chart" id="chart-5">图表</div>
            <div class="panel-footer"></div>
          </div>
          <div class="panel pie">
            <h2>养宠年限占比</h2>
            <div class="chart" id="chart-6">图表</div>
            <div class="panel-footer"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { abc, abc1, abc2, abc3, abc4, abc5, abc6 } from "../commonfun/echart";

export default {
  data() {
    return {
      num1: 148923,
      num2: 135897,
      timer: "", //定义一个定时器的变量
      currentTime:
        new Date().getFullYear() +
        "-" +
        new Date().getMonth() +
        1 +
        "-" +
        new Date().getDate() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(), // 获取当前时间
    };
  },
  mounted() {
    this.el();
    this.el2();
    this.el3();
    this.el4();
    this.el5();
    this.el6();
    this.el7();
    // this.initInterval();

    var vm = this;
    vm.timer = setInterval(() => {
      var y = new Date().getFullYear();
      var m = vm.appendZero(new Date().getMonth() + 1);
      var d = vm.appendZero(new Date().getDate());
      var ho = vm.appendZero(new Date().getHours());
      var mi = vm.appendZero(new Date().getMinutes());
      var se = vm.appendZero(new Date().getSeconds());
      //修改数据date
      vm.currentTime = y + "-" + m + "-" + d + " " + ho + ":" + mi + ":" + se;
    }, 1000);

    setInterval(() => {}, 90000);
  },
  methods: {
    goNav() {
      this.$router.push("/nav");
    },
    initInterval() {
      setInterval(() => {
        this.el();
        this.el2();
        this.el3();
        this.el4();
        this.el5();
        this.el6();
        this.el7();
        // console.log(7778);
        this.num1 += Math.floor(Math.random(0, 1) * 11);
        this.num2 += Math.floor(Math.random(0, 1) * 11);
      }, 8000);
    },
    el() {
      //调用接口
      var data = [200, 300, 300, 900, 1500, 1200, 600];
      abc(data);
    },
    el2() {
      var data = [70, 300, 300, 400, 500];
      abc1(data);
    },
    el3() {
      var data = [200, 300, 300, 900, 1500, 1200, 600];
      abc2(data);
    },
    el4() {
      var data = [200, 300, 300, 900, 1500, 1200, 600];
      abc3(data);
    },
    el5() {
      var data = [200, 300, 300, 900, 1500, 1200, 600];
      abc4(data);
    },
    el6() {
      var data = [200, 300, 300, 900, 1500, 1200, 600];
      abc5(data);
    },
    el7() {
      abc6();
    },

    //时间过滤加0
    appendZero(obj) {
      if (obj < 10) {
        return "0" + obj;
      } else {
        return obj;
      }
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

<style lang="scss" scoped>
li {
  list-style: none;
}
@font-face {
  font-family: electronicFont;
  src: url(../assets/font/DS-DIGIT.TTF);
}

.echart {
  background: url(../assets/image/bg.jpg) no-repeat top center;
  //width: calc(100vw - 17px);
  line-height: 1.15;
  width: 100%;
  height: 100%;
}
.header {
  position: relative;
  height: 100px;
  background: url(../assets/image/head_bg.png) no-repeat;
  background-size: 100% 100%;
}
.header > h3 {
  font-size: 28px;
  color: #fff;
  text-align: center;
  line-height: 80px;
}
.showTime {
  position: absolute;
  right: 30px;
  line-height: 75px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  top: 0;
}

/* 页面主体盒子 */
.mainbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 10px 10px 0px;
}
.column {
  flex: 3;
}
.column:nth-child(2) {
  flex: 5;
  margin: 0px 10px 15px;
}
.panel {
  position: relative;
  height: 261px;
  background-color: pink;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url(../assets/image/line\(1\).png) rgba(255, 255, 255, 0.04);
  padding: 0 15px 40px;
  margin-bottom: 15px;
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.panel-footer {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
}
.panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.panel > h2 {
  height: 48px;
  color: #fff;
  line-height: 48px;
  text-align: center;
  font-size: 20px;
  font-weight: 400px;
}
.chart {
  height: 240px;
}

/* no数字模块 */
.on {
  background: rgba(101, 132, 226, 0.1);
  padding: 15px;
}
.no-hd {
  position: relative;
}
.no-hd::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.no-hd::after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 30px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
}

.no-hd > ul {
  display: flex;
}
.no-hd li {
  position: relative;
  flex: 1;
  line-height: 80px;
  font-size: 70px;
  color: #ffeb7b;
  text-align: center;
  font-family: "electronicFont";
}

.no-hd li:nth-child(1)::after {
  content: "";
  position: absolute;
  top: 25%;
  right: 0;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
}
.on-bd > ul {
  display: flex;
}
.on-bd li {
  flex: 1;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  height: 40px;
  line-height: 40px;
  padding-top: 10px;
}
.map {
  height: 810px;
  position: relative;
}
.map1 {
  width: 518px;
  height: 518px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(../assets/image/map.png);
  opacity: 0.3;
  background-size: 100% 100%;
}
.map2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 643px;
  height: 643px;
  background: url(../assets/image/lbx.png);
  animation: rotate1 15s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
.map3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 566px;
  height: 566px;
  background: url(../assets/image/jt.png);
  animation: rotate2 10s linear infinite;
  opacity: 0.6;
  background-size: 100% 100%;
}
.chart1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 810px;
}

@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate2 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>
