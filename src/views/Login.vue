<template>
  <div>
    <div class="main">
      <div class="login">
        <span>萌宠医院</span>
        <span>后台管理系统</span>
        <img src="../assets/image/9.png" alt="">
        <el-form
      ref="f1"
      :model="form"
      :rules="rules"
    >
      <div class="sfz">{{sfzz}}</div>
      <el-form-item label="手机号:" prop="phone">
        <br>
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码:"  prop="pwd" >
        <br>
        <el-input v-model="form.pwd" placeholder="请输入密码" type='password'/>
      </el-form-item>
      <el-form-item class="btn">
        <el-button style="background: #4EE6D9;" @click.native="submit()">登录</el-button>
      </el-form-item>
      
      
      <el-switch
  v-model="value"
  @change="change1"
  active-color="#13ce66"
  inactive-color="#57e6d9">
</el-switch>
      

    </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/css/global.css'
  export default {
    data() {
    return {
      sfzz:'医生登录',
      value:false,
      form: {
        pwd: "", // 绑定密码
        phone: "", // 绑定手机号
      },
      rules: {
        // 定义表单的验证规则
        pwd: [
          { required: false, message: "密码必填", trigger: "blur" },
          {
            pattern: /^\w{6}$/,
            message: "6位字符, 包含:数字/字母/下划线",
            trigger: "blur",
          },
        ],
        phone: [
          { required: false, message: "手机号必填", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    change1(e){
      if(e){
        this.sfzz='管理员登录'
        // console.log(window.sessionStorage.getItem('P'))
        }else{
          this.sfzz='医生登录'
        // console.log(window.sessionStorage.getItem('P'))
        }
      
    },
    submit() {
      let url = 'http://127.0.0.1:4021/v1/doc/login'
      let data = `doc_phone=${this.form.phone}&doc_upwd=${this.form.pwd}`
      if(this.value){
        if(this.form.phone != '13512341234'){
          this.$message({
                showClose: true,
                message: "没有管理员权限",
                type: "error",
                duration:1500,
              });
              return
        }
      }
      this.axios.post(url,data).then(res=>{
        // console.log(window.sessionStorage.getItem("P"))


        // if(window.sessionStorage.getItem("P")){
        //   if(res.data.data[0].doc_id != 1){
            // this.$message({
            //     showClose: true,
            //     message: "没有管理员权限",
            //     type: "error",
            //     duration:1500,
            //   });
        //       return
        //   }
        // }


        // console.log(res)
        if(res.data.code == 200){
           window.sessionStorage.setItem(
                "userid",
                res.data.data[0].doc_id
              );
              window.sessionStorage.setItem(
                "username",
                res.data.data[0].doc_name
              );
              window.sessionStorage.setItem(
                "userphone",
                res.data.data[0].doc_phone
              );
              this.$store.commit("updateUserInfo", 'ok');
          this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
                duration:1500,
              });
              this.$router.push("/table");
        }else{
          this.$message({
                showClose: true,
                message: "登录失败,请联系管理员",
                type: "error",
                duration:1500,
              });
          // console.log('error')
        }

        
      })
    },
  },
};
</script>

<style scoped src="../assets/css/Login.css">

</style>

<style scoped>
    .el-switch {
      position: relative;
      top: -295px;
      left: 80px;
    }
    .sfz {
      position:absolute;
      top: 220px;
      left: 150px;
      color: gray;
      font-weight: 500;
    }
</style>