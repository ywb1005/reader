<template>
  <div>
    <div class="register">
      <h1>用户注册</h1>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">
        <hr class="line">
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <hr class="line">
        <el-form-item label="短信验证" prop="code">
          <el-input  v-model="form.code"  placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCode" v-if="fetchCodeMsg">获取验证码</el-button>
          <el-button  @click="getCode" :disabled="true" v-else>{{this.timerCodeMsg}}</el-button>
        </el-form-item>
        <hr class="line">
        <el-form-item label="密码" prop="password">
          <el-input  v-model="form.password" type="password" placeholder="请设置密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="again">
          <el-input  v-model="form.again" type="password" placeholder="请确认设置的密码"></el-input>
        </el-form-item>
        <hr class="line">
        <el-form-item >
          <el-checkbox label="我已阅读并同意《用户服务协议》" name="type" v-model="checked"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-if="checked">注 册 用 户</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="true" v-else>注 册 用 户</el-button>
          <el-button @click="getBack"> 返 回 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  const API = process.env.API
  export default {
    components: {
      headers
    },
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.again !== '') {
            this.$refs.form.validateField('again')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          mobile: '',
          code: '',
          password: '',
          again: ''
        },
        timerCodeMsg: '',
        fetchCodeMsg: true,
        codeId: '',
        checked: false,
        rules: {
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            {min: 11, max: 11, message: '号码格式不正确', trigger: 'blur'}
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          again: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      onSubmit () {
        let params = this.form
        params.codeId = this.codeId
        delete params.again
        this.$http.post(API + 'register', params, {
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '注册成功,请登录',
              showClose: true,
              type: 'info'
            })
            this.$router.push({'path': '/'})
            console.log(response)
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      getCode () {
        let data = {
          mobile: this.form.mobile,
          type: 1
        }
        if (this.form.mobile === '') {
          this.$message({
            message: '请输入手机号',
            showClose: true,
            type: 'error'
          })
          return false
        }
        let self = this
        let sec = 120
        for (let i = 0; i <= 60; i++) {
          window.setTimeout(function () {
            if (sec !== 0) {
              self.fetchCodeMsg = false
              self.timerCodeMsg = sec + '秒后重发验证'
              sec--
            } else {
              sec = 120// 如果倒计时结束就让  获取验证码显示出来
              self.fetchCodeMsg = true
            }
          }, i * 1000)
        }
        this.$http.post(API + 'sms', data, {
        }).then((response) => {
          if (response.data.code === 0) {
            this.codeId = response.data.data
            this.$message({
              message: '验证码发送成功',
              showClose: true,
              type: 'info'
            })
            console.log(response)
          }
        }, (response) => {
          console.log(response)
          this.$message({
            message: '错误码为: ' + response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      }
    }
  }
</script>
<style scoped>
  .register{
    width: 30%;
    margin: 40px auto;
    border: 1px solid #20a0ff;
    border-radius: 4px;
    padding: 40px 120px;
    background-color: #afddff;
  }
  .line{
    border: 1px dashed #eeeeee;
  }
</style>
