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
          <el-button
            circle
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >

          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 哪里需要引哪里 -->
    <page-part @pageNum="getP" :total="num" class="page" />
  </div>
</template>

<script>
import PagePart from "@/components/PagePart.vue";
export default {
  components: { PagePart },
  watch: {
    page1(newValue, oldValue) {
      this.getData();
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
    //分页配置/////////////////////////////////////////////////////////////////////////////////////////////////
    getP(data) {
      this.page1 = data;
      // console.log(this.page1)
    },
    // 发送请求获取数据库的数据
    //分数的函数可复制，每页5条
    getData() {
      // console.log(this.$api);
      let url = `pro/petlist?page=${this.page1}`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
    },
    getCount() {
      let url = "pro/petcount";
      this.axios.get(url).then((res) => {
        this.count = res.data.msg[0];
        this.num = Object.values(this.count)[0];
        // console.log(this.num);
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index) {
      // console.log(index);
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
}
.page {
  position: sticky;
  bottom: 15px;
  left: 35%;
}
</style>
