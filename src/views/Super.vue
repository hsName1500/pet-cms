<template>
  <div>
    <el-table
      :stripe="true"
      :border="true"
      :data="
        tableData.filter(
          (tableData) =>
            !search ||
            tableData.doc_name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <!-- <el-table-column width="70" align="center" prop="doc_id" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.row.doc_id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        width="120"
        align="center"
        label="医生头像"
        prop="doc_image"
      >
        <template slot-scope="scope">
          <!-- <img
            :src="`/docimg/${scope.row.doc_image}`"
            alt=""
            class="picture"
          /> -->

          <span>
            <img
              :src="`http://localhost:4021/docimg/${scope.row.doc_image}`"
              class="picture"
              alt=""
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        label="医生姓名"
        prop="doc_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="性别" prop="doc_gender">
        <template slot-scope="scope">
          <span>{{ scope.row.doc_gender == 0 ? "女" : "男" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        align="center"
        label="手机号"
        prop="doc_phone"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="90"
        align="center"
        label="工作年限"
        prop="doc_workyears"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_workyears }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="医生标签"
        align="center"
        width="160"
        prop="doc_logo"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_logo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="擅长"
        align="center"
        width="190"
        prop="doc_goodat"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_goodat }}</span>
        </template>
      </el-table-column>
      <!-- 搜索部分 -->
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            style="width: 180px"
          />
        </template>
        <template slot-scope="scope">
          <el-button circle type="" size="mini" icon="el-icon-edit"
            >修改</el-button
          >

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="open(scope.row.doc_name)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button 
    style="background-color: #6cb9bc; color: white;position: relative;left: 40px;margin-top: 20px;"
    @click="open1">新增医生</el-button>
    <!-- 分页 -->
    <PagePart @pageNum="getP" :total="num" class="page" />
  </div>
</template>

<script>
import qs from "qs";
import PagePart from "@/components/PagePart.vue";
export default {
  watch: {
    page1(newValue, oldValue) {
      this.getData1();
      // this.getData();
      this.getCount();
    },
    count() {
      this.getCount();
      this.getData1();
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
      // 注册信息
      img: "",
      name: "",
      gender: "",
      phone: "",
      workyears: "",
      logo: "",
      goodat: "",
    };
  },
  mounted() {
    this.getData();
    //分页配置//////////////////////////////////////////////////////////////////////////////////////////////////
    this.getData1();
    this.getCount();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  },
  methods: {
    addDoc() {
      let params = {
        doc_name: this.name,
        doc_phone: this.phone,
        doc_gender: this.gender,
        doc_image: this.img,
        doc_workyears: this.workyears,
        doc_details:
          "国家执业兽医师，毕业于西南大学，动物医学专业，从事小动物临床工作近六年，多次参加宠物临床诊疗相关培训，积累了丰富的临床经验， 热衷于宠物临床诊疗行业，并注重改善动物福利。",
        doc_logo: this.logo,
        doc_goodat: this.goodat,
        dept_id: 1,
      };
      // console.log(qs.stringify(params));
      this.axios.post("doc/register", qs.stringify(params)).then((res) => {});
    },
    // 添加医生弹窗
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
            h("p", {
              attrs: {
                text: "请上传头像",
                class: "el-p",
                // autocomplete: "off",
                // rows: 15,
                id: "Content",
              },
            }),
            h("input", {
              attrs: {
                placeholder: "请上传头像",
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
                placeholder: "请输入姓名",
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
                placeholder: "请输入性别",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "genderContent",
              },
              value: this.gender,
              on: { input: this.onGenderInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入电话号码",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "phoneContent",
              },
              value: this.phone,
              on: { input: this.onPhoneInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入工作年限",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "workyearsContent",
              },
              value: this.workyears,
              on: { input: this.onWorkyearsInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入医生标签",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "logoContent",
              },
              value: this.logo,
              on: { input: this.onLogoInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入医生擅长",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "goodatContent",
              },
              value: this.goodat,
              on: { input: this.onGoodatInputChange },
            }),
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 点击确定 要做的事情

            // this.getData();
            // (this.name = ""),
            //   (this.phone = ""),
            //   (this.gender = ""),
            //   (this.img = ""),
            //   (this.workyears = ""),
            //   (this.logo = ""),
            //   (this.goodat = ""),
            document.getElementById("imgContent").value = "";

            document.getElementById("nameContent").value = "";
            document.getElementById("genderContent").value = "";
            document.getElementById("phoneContent").value = "";
            document.getElementById("workyearsContent").value = "";
            document.getElementById("logoContent").value = "";
            document.getElementById("goodatContent").value = "";
            done();
            this.addDoc();
            this.getData1();
            this.getCount();
          }
          if (action === "cancel") {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "输入成功,添加医生信息已完成",
        });
      });
    },
    onimgInputChange(e) {
      // console.log(e.value);
      // let img1 = document
      //   .getElementById("imgContent")
      //   .value.split("\\")
      //   .splice(-1, 1)
      //   .toString();
      let img1 = e.target.files[0];
      // console.log(img1);
      let data = new FormData();

      data.append("photo", img1);
      // console.log(data.has("photo"), data.get("photo"), data);
      this.axios.post("free/updoc", data).then((res) => {
        // console.log(res);
        this.img = res.data.data.path.split("/").splice(-1, 1);
      });

    },
    onNameInputChange() {
      this.name = document.getElementById("nameContent").value;
      // console.log(this.name);
    },
    onGenderInputChange() {
      this.gender = document.getElementById("genderContent").value;
      // console.log(this.gender);
    },
    onPhoneInputChange() {
      this.phone = document.getElementById("phoneContent").value;
      // console.log(this.phone);
    },
    onWorkyearsInputChange() {
      this.workyears = document.getElementById("workyearsContent").value;
      // console.log(this.workyears);
    },
    onLogoInputChange() {
      this.logo = document.getElementById("logoContent").value;
      // console.log(this.logo);
    },
    onGoodatInputChange() {
      this.goodat = document.getElementById("goodatContent").value;
      // console.log(this.goodat);
    },
    //分页配置/////////////////////////////////////////////////////////////////////////////////////////////////
    getP(data) {
      this.page1 = data;
      // console.log(this.page1)
    },
    // 发送请求获取数据库的数据
    //分数的函数可复制，每页5条
    getData1() {
      // console.log(this.$api);
      let url = `doc/showlist?page=${this.page1}`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
    },
    getCount() {
      let url = "doc/showcount";
      this.axios.get(url).then((res) => {
        this.count = res.data.msg[0];
        this.num = Object.values(this.count)[0];
        // console.log(this.num);
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 发送请求获取数据库的数据
    getData() {
      let url = `doc/all`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.data;
        // console.log(this.tableData);
      });
    },
    open(name) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((action) => {
          if (action === "confirm") {
            this.delDoc(name);
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
    delDoc(name) {
      let params = { doc_name: name };
      this.axios.post("doc/del", qs.stringify(params)).then((res) => {
        this.getData();
        this.getData1();
        this.getCount();
      });
    },

    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },

  },
  components: { PagePart },
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
}
.page {
  position: sticky;
  bottom: 15px;
  left: 35%;
}
</style>
