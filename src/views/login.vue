<template>
  <div>
    <div class="login">
      <h1>书屋登录</h1>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <hr class="line">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <hr class="line">
        <el-form-item label="密码" prop="password">
          <el-input  v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <hr class="line">
        <el-form-item >
          <el-button  @click="onSubmit" type="text">忘记密码?</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">书 屋 登 录</el-button>
          <el-button @click="getBack">返 回 首 页</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  const API = process.env.API
  export default {
    data () {
      return {
        form: {
          mobile: '',
          password: ''
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {min: 11, max: 11, message: '号码格式不正确', trigger: 'blur'}
          ],
          password: [
            { required: true, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      onSubmit () {
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.form.mobile))) {
          this.$message({
            message: '手机格式错误',
            showClose: true,
            type: 'error'
          })
        }
        let params = this.form
        this.$http.post(API + 'login', params, {
        }).then((response) => {
          if (response.data.code === 0) {
            let data = response.data.data
            this.$message({
              message: '登录成功',
              showClose: true,
              type: 'info'
            })
            window.localStorage.setItem('user', JSON.stringify({name: data.name, mobile: data.mobile, token: data.token}))
            this.$router.go(-1)
            console.log(response)
          }
        }, (response) => {
          this.$message({
            message: response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .login{
    width: 30%;
    margin: 120px auto;
    border: 1px solid #20a0ff;
    border-radius: 4px;
    padding: 40px 120px;
    background-color: #afddff;
  }
  .line{
    border: 1px dashed #eeeeee;
  }
</style>
