<template>
  <div>
    <div class="login">
      <h1 style="margin-left: 130px">书屋登录</h1>
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
          <el-button  @click="dialogFormVisible = true" type="text">忘记密码?</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">书 屋 登 录</el-button>
          <el-button @click="getBack">返 回 首 页</el-button>
        </el-form-item>
      </el-form>
      <el-row>
        <el-dialog title="找回密码" v-model="dialogFormVisible">
          <el-form :model="updateForm" ref="updateForm" style="width: 400px">
            <el-form-item label="手机号" >
              <el-input v-model="updateForm.mobile"  placeholder="请输入注册手机号" size="large"></el-input>
            </el-form-item>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="foundPwd" :disabled="isSend">找 回 密 码</el-button>
          </el-form>
        </el-dialog>
      </el-row>
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
        updateForm: {
          mobile: ''
        },
        isSend: false,
        dialogFormVisible: false,
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
      },
      foundPwd () {
        console.log(this.updateForm)
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.updateForm.mobile))) {
          this.$message({
            message: '手机格式错误',
            showClose: true,
            type: 'error'
          })
          return false
        }
        this.$confirm('本操作将会重置您的密码并以短信形式将新密码发送到您的手机上,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post(API + 'getPwd', {mobile: this.updateForm.mobile, type: 2}, {
          }).then((response) => {
            if (response.data.code === 0) {
              this.$message({
                message: '密码已发送',
                showClose: true,
                type: 'info'
              })
              this.isSend = true
            }
          }, (response) => {
            this.$message({
              message: response.data.data,
              showClose: true,
              type: 'error'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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
