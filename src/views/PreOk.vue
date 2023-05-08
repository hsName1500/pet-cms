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
        width="125"
        align="center"
        prop="order_number"
        label="订单号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="125"
        align="center"
        label="用户名"
        prop="order_uname"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_uname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="125"
        align="center"
        label="手机号"
        prop="order_phone"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column width="125" align="center" label="宠物名" prop="p_name">
        <template slot-scope="scope">
          <span>{{ scope.row.p_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="125"
        align="center"
        label="主治医生"
        prop="doc_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="125"
        align="center"
        label="花费"
        prop="case_spends"
      >
        <template slot-scope="scope">
          <span>¥{{ scope.row.case_spends }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="订单状态"
        align="center"
        width="125"
        prop="order_status"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_status == 1 ? "已完成" : "" }}</span>
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
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          > -->
          <!-- <el-button
            circle
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          > -->
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeUserById(scope.row.doc_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: "",
    };
  },
  mounted() {
    this.getData();
    function a() {
      if (location.href.indexOf("#reloaded") <= 0) {
        location.href = location.href + "#reloaded" + "#reloaded";
        location.reload();
      }
    }
    // console.log(window.sessionStorage);
  },
  methods: {
    // 发送请求获取数据库的数据
    getData() {
      let url = `order/root/finish`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
        // console.log(this.tableData);
      });
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
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
</style>
