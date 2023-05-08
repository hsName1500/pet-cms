<template>
  <div>
    <el-container>
      <el-header>
        <img
          src="../assets/dog.jpg"
          alt="#"
          height="100%"
          style="margin-left: 5vw"
        />
        <img src="../assets/cat.jpg" alt="#" height="100%" />
        <img src="../assets/title.png" alt="#" style="margin-left: 18vw" />
        <div class="login">
          <span>{{ $store.state.loginname }}</span>&nbsp; &nbsp;
          <span
          @click="quituser"
          >[退出]</span>
        </div>
      </el-header>
      <el-container>
        <!-- 竖直导航栏 -->
        <el-aside width="200px" style="height: calc(100vh - 60px)">
          <!-- 别忘了  router !! -->
          <el-menu
            router
            class="menu"
            :default-active="$route.path"
            text-color="#fff"
            active-text-color="#fff"
            background-color="#6cb9bc"
            :unique-opened="true"
          >
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-s-data"></i>
                <span @click="$router.push('/nav')">个人信息</span>
              </template>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-s-home"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/nav/super" v-if="this.$store.state.loginuid==1 ">超级管理员</el-menu-item>
              <el-menu-item index="/nav/doc" >医生用户</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"
                ><i class="el-icon-folder-opened"></i>
                <span>病例档案</span>
              </template>
              <el-menu-item index="/nav/pet">宠物病例</el-menu-item>
              <el-menu-item index="/nav/ok">已就诊病例</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"
                ><i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="/nav/pre">预约订单</el-menu-item>
              <el-menu-item index="/nav/finish">已完成订单</el-menu-item>
              <el-menu-item index="/nav/lose">过期订单</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"
                ><i class="el-icon-document-add"></i>
                <span>医院管理</span>
              </template>
              <el-menu-item index="/nav/hospital"
              v-if="this.$store.state.loginuid==1 "
              >医生信息</el-menu-item>
            </el-submenu>

            <el-submenu index="6">
              <template slot="title"
                ><i class="el-icon-menu"></i>
                <span>其他</span>
              </template>
              <el-menu-item index="/nav/product"
              >商品信息</el-menu-item>
              <el-menu-item index="/nav/server">宠物服务</el-menu-item>
              <el-menu-item index="/nav/support"
              v-if="this.$store.state.loginuid==1 "
              >客服</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="el-main">
          <!-- 二级路由的占位符 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  mounted () {
   this.$store.commit("updateUserInfo", ""); ;
  },
  methods: {
    quituser() {
       if (window.sessionStorage.getItem("username") == null) {
        return;
      }
      this.$store.commit("quitUserInfo", "");
       
      this.$router.push("/");
      // console.log(this.$store.state.loginname)
      // alert("已退出");
      this.$message({
                showClose: true,
                message: "退出成功",
                type: "success",
                duration:1500,
              });
    },
  },
};
</script>

<style>
.el-header {
  background-color: #6cb9bc;
  line-height: 60px;
  padding-top: 5px;
  min-width: 768px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #6cb9bc;
  color: #fff;
  text-align: center;
  user-select: none;
}
/* 标题的字号大小 */
.el-submenu__title span {
  font-size: 18px !important;
}
.el-submenu__icon-arrow {
  opacity: 0;
}
/* .el-menu {
  background-color: #6cb9bc;
} */
.el-icon-s-data,
.el-icon-s-home,
.el-icon-folder-opened,
.el-icon-s-order,
.el-icon-document-add,
.el-icon-menu {
  margin-right: 10px !important;
  color: #fff !important;
}
/* .el-menu--inline {
  background-color: rgb(105, 185, 188) !important;
} */
.el-menu--inline {
  background-color: #589ca3 !important;
}

/* 小列表中激活时候的颜色 */
.el-menu-item {
  background-color: #589ca3 !important;
  font-size: 16px;
}
/* .is-active {
  background-color: #008789 !important;
} */
/* 后台主题色：#6cb9bc激活色：#008789 下拉选框颜色： #589ca3  自带颜色： #569496*/
.el-menu-item.is-active {
  background-color: #008789 !important;
}
.el-submenu__title:hover {
  background-color: #6cb9bc !important;
}
.el-main {
  padding: 0;
}
/* 头部右侧欢迎登录部分 */
.login {
  white-space: nowrap;
  line-height: 100%;
  margin-left: 300px;
  color: #fff;
  font-size: 16px;
  user-select: none;
}
/*后台所有 编辑按钮的背景颜色设置  */
.cell > .el-button--mini.is-circle:first-child {
  background-color: #008789;
  color: #fff;
  padding: 7px 10px;
}
/* 后台所有 删除按钮的样式设置 */
.el-button--mini {
  padding: 7px 5px;
  font-size: 14px;
}
</style>
