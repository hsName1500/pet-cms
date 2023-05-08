<template>
  <div style="text-align: center; margin: 0 auto; position: fixed">
    <!-- 1、引入模板 -->
    <el-pagination
      background
      :current-page="pageNum"
      layout="total,prev, pager, next,jumper"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  watch: {
    data(newValuenew, oldValue) {
      pageNum=1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val;
      // console.log(val);
      this.$emit("pageNum", this.pageNum);
    },
  },
  data() {
    return {
      pageNum: 1,
    };
  },
  props: {
    // 总的数据条数
    total: {
      type: Number,
    },
    // 每页数据条数
    pageSize: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style lang="scss" scoped></style>
