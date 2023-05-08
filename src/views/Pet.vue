<template>
  <div>
    <el-table
      :stripe="true"
      :border="true"
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.order_phone.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column
        width="150"
        align="center"
        label="*主人名"
        prop="order_uname"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_uname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        label="*手机号"
        prop="order_uname"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="宠物名" prop="p_name">
        <template slot-scope="scope">
          <span>{{ scope.row.p_name ? scope.row.p_name : "/" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        align="center"
        label="*业务内容"
        prop="order_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150"
        align="center"
        label="*主治医生"
        prop="doc_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_name ? scope.row.doc_name : "/" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        label="*消费金额"
        prop="order_price"
      >
        <template slot-scope="scope">
          <span>￥{{ scope.row.order_price }}</span>
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
          <el-button
            circle
            type=""
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
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
            @click="removeUserById(scope.row.order_number)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <page-part @pageNum="getP" :total="number" class="petpage" />
  </div>
</template>

<script>
import PagePart from "@/components/PagePart.vue";

export default {
  components: { PagePart },
  watch: {
    page4(from, to) {
      this.getData();
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
      page4: 1,
      number: "",
    };
  },
  mounted() {
    this.getCount();
    this.getData();
  },
  methods: {
    getP(aa) {
      this.page4 = aa;
    },
    // 发送每页的页码请求每页的数据
    getData() {
      let url = `order/alllist?page=${this.page4}`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
    },
    // 获取数据的总条数
    getCount() {
      let url = `order/allcount`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.number = res.data.msg[0].sum;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
.petpage {
  position: sticky;
  bottom: 10px;
  left: 45%;
}
.el-table__row {
  height: 90px;
}
</style>
