<template>
  <div>
    <!-- views/Form.vue -->
    <el-form 
      ref="f1"
      :model="form" 
      :rules="rules"
      label-width="100px"
      style="width: 400px;">
      <el-form-item label="账号" prop="name">
        <el-input v-model="form.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="身份证">
        <el-upload
          class="upload-demo"
          drag
          action="http://localhost:3000/upload"
          name="uploadFile"
          multiple
          :on-success="uploadSuccess"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit()">提交注册信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',  // 绑定账号
        phone: '',  // 绑定手机号
        email: '',  // 绑定邮箱
      },
      rules: {   // 定义表单的验证规则
        name: [
          { required:true, message:'账号必填', trigger:'blur'},
          { pattern: /^\w{6,10}$/, 
            message:'6~10位字符, 包含:数字/字母/下划线', trigger:'blur'}
        ],
        phone: [
          {required:true, message:'手机号必填', trigger:'blur'},
          { pattern: /^1[3-9]\d{9}$/, message:'格式不正确', trigger:'blur'}
        ],
        email: [
          {required:true, message:'邮箱必填', trigger:'blur'},
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, 
            message:'邮箱格式不正确', trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    uploadSuccess(res,file){
      console.log(res);
    },
    submit(){   // 当点击注册按钮后执行，收集所有数据，发请求
      this.$refs['f1'].validate((valid)=>{
        if (valid) { // 验证成功  valid==true
          console.log(this.form)
        }else {  // 验证失败  valid==false
          console.log('验证失败，检查表单项')
          console.warn('验证失败，检查表单项')
          console.info('验证失败，检查表单项')
          console.error('验证失败，检查表单项')
        }
      })

    }
  }
}
</script>