<template>
  <div>
    <el-table
      :stripe="true"
      :border="true"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.item_name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >

      <!-- <el-table-column
        width="100"
        align="center"
        prop="item_id"
        label="ID"
      ></el-table-column> -->
      <el-table-column
        width="150"
        align="center"
        label="商品图片"
        prop="item_image"
      >
        <template slot-scope="scope">
          <span>
            <img
              :src="`http://127.0.0.1:4021/img/${scope.row.item_image}`"
              alt=""
              class="picture"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="170"
        align="center"
        label="*商品名称"
        prop="item_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.item_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150"
        align="center"
        label="*商品价格"
        prop="item_price"
      >
        <template slot-scope="scope">
          <span>￥{{ scope.row.item_price }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="170"
        align="center"
        label="*商品相关"
        prop="item_class"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.item_class ? "狗" : "猫" }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="商品数量" prop="count">
        <template slot-scope="scope">
          <span>{{ scope.row.count == null ? "/" : scope.row.count }}</span>
        </template>
      </el-table-column>

      <!-- 搜索部分 -->
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 200px"
          />
        </template>
        <template slot-scope="scope">

          <el-button circle type="primary" size="mini" icon="el-icon-edit"
          @click="open2(scope.row.item_id)"
            >修改</el-button
          >

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"

            circle
            @click="open(scope.row.item_id)"

            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button 
    style="background-color: #6cb9bc; color: white;position: relative;left: 40px;margin-top: 20px;"
    @click="open1">新增商品</el-button>
    <!-- 分页 哪里需要引哪里 -->
    <page-part @pageNum="getP" :total="num" class="page" />
  </div>
</template>

<script>
import PagePart from "@/components/PagePart.vue";
import qs from "qs";
export default {
  components: { PagePart },
  watch: {
    page1(newValue, oldValue) {
      this.getData();
      this.getCount();
    },
    count() {
      this.getData();
      // this.getCount();
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
      //分页配置///////////////////////////////////////////////////////////////////////////////////////////////////////
      count: null,
      num: null,
      page1: 1,
      // 添加商品信息
      img:'',
      name:'',
      price:'',
      class:'',
      number:'',
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    };
  },
  mounted() {
    //分页配置//////////////////////////////////////////////////////////////////////////////////////////////////
    this.getCount();
    this.getData();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  methods: {
    // 修改商品
    updatePro(i) {
      let params = {
        item_image: this.img,
        item_name: this.name,
        item_price: this.price,
        count: this.number,
        item_id: i,
      };
      this.axios.post("pro/updatePro", qs.stringify(params)).then((res) => {
        this.getData();
      });
    },
    // 修改商品和弹窗
    open2(i) {
      const h = this.$createElement;
      this.$msgbox({
        title: "请输入以下必要信息",
        message: h(
          "div",
          {
            attrs: {
              class: "el-textarea",
            },
          },
          [
            h("input", {
              attrs: {
                placeholder: "请上传商品图片",
                type: "file",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "imgContent",
              },
              value: this.img,
              on: { input: this.onimgInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品名称",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "nameContent",
              },
              value: this.name,
              on: { input: this.onNameInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品价格",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "priceContent",
              },
              value: this.price,
              on: { input: this.onPriceInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品数量",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "numberContent",
              },
              value: this.number,
              on: { input: this.onNumberInputChange },
            }),
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 点击确定 要做的事情
            this.updatePro(i);
            document.getElementById("imgContent").value = "";
            document.getElementById("nameContent").value = "";
            document.getElementById("priceContent").value = "";
            document.getElementById("numberContent").value = "";
            done();
          }
          if (action === "cancel") {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "输入成功,添加商品信息已完成",
        });
      });
    },
    //分页配置/////////////////////////////////////////////////////////////////////////////////////////////////
    getP(data) {
      this.page1 = data;
      // console.log(this.page1)
    },
    // 发送请求获取数据库的数据
    //分数的函数可复制，每页5条
    getData() {
      // console.log(this.$api);
      let url = `pro/showlist?page=${this.page1}`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
    },
    getCount() {
      let url = "pro/showcount";
      this.axios.get(url).then((res) => {
        this.count = res.data.msg[0];
        this.num = Object.values(this.count)[0];
        // console.log(this.num);
      });
    },
    // 添加商品
    addpro(){
      let params = {
      item_image:this.img,
      item_name:this.name,
      item_price:this.price,
      item_class:this.class,
      count:this.number,
      }
      this.axios.post('pro/add',qs.stringify(params)).then(res=>{
        this.getData();
        this.getCount();
      })
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 删除商品和弹窗提示
    open(i) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((action) => {
          if (action === "confirm") {
            this.delpro(i);
          }
          this.$message({
            type: "success",

            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    delpro(i) {
      let params = {
        item_id: i,
      };
      this.axios.post("pro/del", qs.stringify(params)).then((res) => {
        this.getData();
        this.getCount();
      });
    },
    // 添加功能和弹窗
    open1() {
      const h = this.$createElement;
      this.$msgbox({
        title: "请输入以下必要信息",
        message: h(
          "div",
          {
            attrs: {
              class: "el-textarea",
            },
          },
          [
            h("input", {
              attrs: {
                placeholder: "请上传商品图片",
                type: "file",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "imgContent",
              },
              value: this.img,
              on: { input: this.onimgInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品名称",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "nameContent",
              },
              value: this.name,
              on: { input: this.onNameInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品价格",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "priceContent",
              },
              value: this.price,
              on: { input: this.onPriceInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品种类",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "classContent",
              },
              value: this.class,
              on: { input: this.onClassInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入商品数量",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "numberContent",
              },
              value: this.number,
              on: { input: this.onNumberInputChange },
            }),
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 点击确定 要做的事情
            this.addpro()
            document.getElementById("imgContent").value = "";
            document.getElementById("nameContent").value = "";
            document.getElementById("priceContent").value = "";
            document.getElementById("classContent").value = "";
            document.getElementById("numberContent").value = "";
            done();
          }
          if (action === "cancel") {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "输入成功,添加商品信息已完成",
        });
      });
    },
        onimgInputChange(e) {
      let img1 = e.target.files[0];
      // console.log(img1);
      let data = new FormData();
      data.append("photo", img1);
      // console.log(data.has("photo"), data.get("photo"), data);
      this.axios.post("free/uppro", data).then((res) => {
        // console.log(res);
        this.img = res.data.data.path.split("/").splice(-1, 1);
      });
    },
    onNameInputChange() {
      this.name = document.getElementById("nameContent").value;
      // console.log(this.name);
    },
    onPriceInputChange() {
      this.price = document.getElementById("priceContent").value;
      // console.log(this.gender);
    },
    onClassInputChange() {
      this.class = document.getElementById("classContent").value;
      // console.log(this.phone);
    },
    onNumberInputChange() {
      this.number = document.getElementById("numberContent").value;
      // console.log(this.workyears);
    },
  },
};
</script>
<style>
/* 标题字体大小 */
.el-table .cell {
  font-size: 17px;
}
/* 输入框字号以及输入字体的颜色 */
.el-input__inner {
  font-size: 15px;
  color: rgb(94, 94, 94);
}
/* 图片样式设置 */
.picture {
  height: 55px;
  border-radius: 20%;
  width: 50%;
}
.page {
  position: sticky;
  bottom: 15px;
  left: 35%;
}
</style>
