<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #008789 !important;
  color: #fff;
}
</style>
