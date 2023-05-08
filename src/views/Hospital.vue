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
        width="119"
        align="center"
        label="医生头像"
        prop="doc_image"
      >
        <template slot-scope="scope">
          <span>
            <img
              :src="`http://localhost:4021/docimg/${scope.row.doc_image}`"
              alt=""
              class="picture"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        width="110"
        align="center"
        label="*医生姓名"
        prop="doc_name"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="性别" prop="doc_gender">
        <template slot-scope="scope">
          <span>{{ scope.row.doc_gender ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        label="*手机号"
        prop="doc_phone"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        label="*工作年限"
        prop="doc_workyears"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doc_workyears }}年+</span>
        </template>
      </el-table-column>
      <el-table-column
        label="医生标签"
        align="center"
        width="120"
        prop="doc_logo"
      >
        <template slot-scope="scope">
          <span :title="scope.row.doc_logo">{{ scope.row.doc_logo }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="*擅长"
        align="center"
        width="130"
        prop="doc_goodat"
      >
        <template slot-scope="scope">
          <span :title="scope.row.doc_goodat">{{ scope.row.doc_goodat }}</span>
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

          ></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <page-part class="pagehos" @pageNum="getP" :total="num" />
  </div>
</template>

<script>
import PagePart from "@/components/PagePart.vue";

export default {
  components: { PagePart },
  // 监听page3的值，变化后重新发请求获取数据
  watch: {
    page1(newValue, oldValue) {
      this.getData();
    },
  },
  data() {
    return {
      tableData: [],
      search: "",
      count: null,
      num: null,
      page1: 1,
    };
  },
  mounted() {
    this.getCount();
    this.getData();
  },
  methods: {
    // 获取传来的点击的数字页数
    getP(data) {
      this.page1 = data;
    },
    // 发送请求获取数据库的数据
    getData() {
      let url = `doc/showlist?page=${this.page1}`;
      this.axios.get(url).then((res) => {
        // console.log(res);
        this.tableData = res.data.msg;
      });
    },
    //发送请求获取总数据量
    getCount() {
      let url = "doc/showcount";
      this.axios.get(url).then((res) => {
        this.count = res.data.msg[0];
        this.num = Object.values(this.count)[0];
        // console.log(this.num);
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
/* 设置每列中的字体溢出显示省略号 */
.el-table .cell span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 输入框字号以及输入字体的颜色 */
.el-input__inner {
  font-size: 15px;
  color: rgb(94, 94, 94);
}
/* 图片样式设置 */

  /* height: 55px; */
  .picture {
  height: 55px;
  border-radius: 20%;

  /* background-size: cover; */
  /* overflow: hidden; */
}
.pagehos {
  position: sticky;
  bottom: 6px;
  left: 45%;
}
</style>
