<template>
  <div id="main" v-if="data">
    <div class="left">
      <img :src="`/docimg/${data.doc_image}`" alt="" />
    </div>

    <div class="right">
      <ul>
        <li>医生姓名：{{ data.doc_name }}</li>
        <li>性别：{{ data.doc_gender ? "男" : "女" }}</li>
        <li>电话：{{ data.doc_phone }}</li>
        <li>工作年限：{{ data.doc_workyears }}年+</li>
        <li>医生标签：{{ data.doc_logo }}...<span class="logo"></span></li>
      </ul>
      <div class="detail">{{ data.doc_details }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let url = "doc/find";
      let data = `doc_id=${this.$store.state.loginuid}`;
      this.axios.post(url, data).then((res) => {
        // console.log(res);
        this.data = res.data.data[0];
      });
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.el-main {
  border: 1px solid black;
  height: calc(100vh-60px);
  margin: 10px;
}
#main {
  display: flex;
  height: calc(100vh-60px);
  margin: 10px;
}
.left {
  width: 250px;
  padding-left: 10px;
}
.left img {
  /* transform: scale(2); */
  width: 100%;
  transform: translate(0, 100px) scale(1.3);
}
.right {
  height: calc(100vh-60px);
  width: 45vw;
  transform: translate(120px, 60px);
}
#main ul li {
  font-size: 18px;
  line-height: 250%;
  color: #01696b;
}
.detail {
  margin-top: 10px;
  font-size: 20px;
  color: #01696b;
  line-height: 200%;
}
</style>
