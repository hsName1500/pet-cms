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
      <el-table-column
        width="170"
        align="center"
        prop="order_number"
        label="订单号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="170"
        align="center"
        label="预约用户"
        prop="order_uname"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_uname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="170"
        align="center"
        label="用户号码"
        prop="order_phone"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="190"
        align="center"
        label="预约时间"
        prop="order_time"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        label="订单状态"
        prop="order_status"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_status == 0 ? "已预约" : "" }}</span>
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
          <!-- <el-button
            circle
            type=""
            size="mini"
            icon="el-icon-edit"
            @click="updateStatus(scope.row.order_number)"
            >已完成</el-button
          > -->
          <el-button
            circle
            size="mini"
            type="success"
            icon="el-icon-edit"
            @click="open(scope.row.order_number)"
            >确认</el-button
          >
          <!-- 删除按钮 -->
          <!-- <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeUserById(scope.row.doc_id)"
          ></el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      search: "",
      nameContent: "",
      petContent: "",
      costContent: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 发送请求获取数据库的数据
    getData() {
      let url = `order/root/apt`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
    },
    updateStatus(i) {
      let params = {
        order_number: i,
      };
      this.axios
        .post("order/updateStauts", qs.stringify(params))
        .then((res) => {
          // console.log(res.data.code);
          this.getData();
        });
    },
    addmsg(i) {
      let params = {
        doc_name: this.nameContent,
        p_name: this.petContent,
        case_spends: this.costContent,
        order_number: i,
      };
      this.axios.post("order/updateMsg", qs.stringify(params)).then((res) => {
        // console.log(res.data.code);
      });
    },
    open(i) {
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
                placeholder: "请输入医生名字",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "nameContent",
              },
              value: this.nameContent,
              on: { input: this.onNameInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "请输入宠物名",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "petContent",
              },
              value: this.petContent,
              on: { input: this.onPetInputChange },
            }),
            h("input", {
              attrs: {
                placeholder: "本次花费金额",
                class: "el-textarea__inner",
                // autocomplete: "off",
                // rows: 15,
                id: "costContent",
              },
              value: this.costContent,
              on: { input: this.onCostInputChange },
            }),
          ]
        ),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            // 点击确定 要做的事情
            // console.log(this.nameContent, this.petContent, this.costContent);
            this.addmsg(i);
            (this.nameContent = ""),
              (this.petContent = ""),
              (this.costContent = ""),
              (document.getElementById("nameContent").value = "");
            document.getElementById("petContent").value = "";
            document.getElementById("costContent").value = "";
            this.updateStatus(i), done();
          }
          if (action === "cancel") {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "输入成功,订单已完成",
        });
      });
    },
    onNameInputChange() {
      this.nameContent = document.getElementById("nameContent").value;
    },
    onPetInputChange() {
      this.petContent = document.getElementById("petContent").value;
    },
    onCostInputChange() {
      this.costContent = document.getElementById("costContent").value;
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
.el-textarea__inner {
  margin-bottom: 15px;
}
</style>
