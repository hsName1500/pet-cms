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
          <span>{{ scope.row.order_status == 2 ? "已过期" : "" }}</span>
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
          <!-- <el-button circle type="" size="mini" icon="el-icon-edit"
            >已过期</el-button
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
          >删除</el-button>
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
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 发送请求获取数据库的数据
    getData() {
      let url = `order/root/unfinish`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
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
