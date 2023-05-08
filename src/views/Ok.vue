<template>
  <div>
    <el-table
      :stripe="true"
      :border="true"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        width="180"
        align="center"
        label="*主人名"
        prop="order_uname"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_uname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" align="center" label="宠物名" prop="p_name">
        <template slot-scope="scope">
          <span>{{ scope.row.p_name ? scope.row.p_name : "/" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        align="center"
        label="*宠物种类"
        prop="p_info"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.p_info ? scope.row.p_info : "/" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="250"
        align="center"
        label="*业务内容"
        prop="order_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.order_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180"
        align="center"
        label="*主治医生"
        prop="doc_name"
      >
        <template slot-scope="scope">
          <span>{{
            scope.row.doc_name ? scope.row.doc_name : "(不可为空)"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
        align="center"
        label="*消费金额"
        prop="order_price"
      >
        <template slot-scope="scope">
          <span>￥{{ scope.row.order_price }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <page-part @pageNum="getP" :total="number" class="okpage" />
  </div>
</template>

<script>
import PagePart from "@/components/PagePart.vue";
export default {
  components: { PagePart },
  watch: {
    page5(from, to) {
      this.getData();
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
      page5: 1,
      number: "",
    };
  },
  mounted() {
    this.getCount();
    this.getData();
  },
  methods: {
    getP(bb) {
      this.page5 = bb;
    },
    // 发送每页的页码请求每页的数据
    getData() {
      let url = `order/alllist?page=${this.page5}`;
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
.okpage {
  position: sticky;
  bottom: 10px;
  left: 45%;
}
.el-table__row {
  height: 90px;
}
</style>
