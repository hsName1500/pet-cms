<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="序号" width="80">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="医生姓名" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="性别" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.gender }}</span>
      </template>
    </el-table-column>
    <el-table-column label="手机号" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column label="医生头像" width="120">
      <template slot-scope="scope">
        <span>{{ scope.row.image }}</span>
      </template>
    </el-table-column>
    <el-table-column label="工作年限" width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.workyears }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column
      label="详细介绍"
      width="300">
      <template slot-scope="scope">
        <span>{{ scope.row.details }}</span>
      </template>
    </el-table-column> -->
    <el-table-column label="医生标签" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.logo }}</span>
      </template>
    </el-table-column>
    <el-table-column label="擅长" width="200">
      <template slot-scope="scope">
        <span>{{ scope.row.goodat }}</span>
      </template>
    </el-table-column>
    <el-table-column width="200" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      tableData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    },
    getData() {
      var url = "http://127.0.0.1:4021/doctor/all";
      this.axios.get(url).then((res) => {
        // console.log(res);
        let data = res.data;
        data.data.forEach((element) => {
          this.tableData.push({
            id: element.doc_id,
            name: element.doc_name,
            gender: element.doc_gender,
            phone: element.doc_phone,
            image: element.doc_image,
            workyears: element.doc_workyears,
            details: element.doc_details,
            logo: element.doc_logo,
            goodat: element.doc_goodat,
          });
        });
      });
    },
  },
};
</script>
<style>
* {
  text-align: center;
}
</style>
