<template>
  <div class="body">
    <div class="header">
      <span class="title" ><router-link :to="{path: '/'}" style="color: #1d90e6">一叶书屋</router-link></span>
      <span class="title" >个人中心</span>
      <span class="logout" @click="logout">退出</span>
      <span class="welcome">欢迎您!  {{this.form.username}}</span>
    </div>
    <div class="sidebar">
      <el-menu default-active="1" class="el-menu-vertical-demo" theme="dark"  @select="select">
        <el-menu-item index="1" >基本信息</el-menu-item>
        <el-menu-item index="2" >修改密码</el-menu-item>
        <el-menu-item index="3" >书籍上传</el-menu-item>
      </el-menu>
    </div>
    <div class="main" v-show="isBase">
      <el-form :model="form" ref="form"  label-width="120px">
        <el-form-item label="手机号" class="user-form" prop="mobile">
          <el-input v-model="form.mobile" :disabled="true"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="用户名" class="user-form" prop="name">
          <el-input  v-model="form.username"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="电子邮箱" class="user-form" prop="email">
          <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="性别" class="user-form" prop="gender">
          <el-radio class="radio" v-model="form.gender" :label="1">男</el-radio>
          <el-radio class="radio" v-model="form.gender" :label="2">女</el-radio>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="年龄" class="user-form" prop="age">
          <el-input  v-model="form.age"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="爱好" class="user-form" prop="hobby">
          <el-input v-model="form.hobby" ></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="图书收藏" class="user-form" prop="collect">
          <img :src="img" v-for="img in imageList">
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item class="user-form">
          <el-button type="primary" @click="onSubmit">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main" v-show="isPwd" style="margin-top: 280px; margin-bottom: 200px">
      <el-form :model="updateForm" :rules="rule" ref="updateForm"  label-width="120px">
        <el-form-item label="原密码" class="user-form" prop="oldPwd">
          <el-input type="password" v-model="updateForm.oldPwd" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="新密码" class="user-form" prop="newPwd">
          <el-input type="password" v-model="updateForm.newPwd" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item class="user-form">
          <el-button type="primary" @click="update">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="main" v-show="isBook" style="margin-top: 200px; margin-bottom: 160px">
      <el-form :model="bookForm" ref="bookForm"  label-width="120px">
        <el-form-item label="书籍名称" class="user-form" >
          <el-input  v-model="bookForm.name" placeholder="请输入书籍名称"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item label="作者" class="user-form" >
          <el-input  v-model="bookForm.author" placeholder="请输入书籍作者"></el-input>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item class="user-form" label="书籍上传">
          <el-upload
            name="files"
            class="upload-demo"
            :action="zipAction"
            :headers="headers"
            :on-success="Success"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传压缩包文件, 且不能超过50M</div>
          </el-upload>
        </el-form-item>
        <hr class="line-dashed">
        <el-form-item class="user-form">
          <el-button type="primary" @click="uploadBook">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  const API = process.env.API
  let user = JSON.parse(window.localStorage.getItem('user'))
  export default {
    components: {
    },
    mounted () {
      this.getUserInfo()
    },
    data () {
      return {
        form: {
          mobile: '',
          gender: 1,
          age: '',
          username: '',
          email: '',
          hobby: ''
        },
        imageList: [],
        bookForm: {
          name: '',
          author: '',
          url: ''
        },
        updateForm: {
          oldPwd: '',
          newPwd: ''
        },
        isBase: true,
        isPwd: false,
        isBook: false,
        image: '',
        zipAction: API + 'files',
        headers: {'Authorization': 'Bearer ' + user.token},
        fileList: [],
        rule: {
          oldPwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      onSubmit () {
        this.$http.post(API + 'user/info', this.form, {
          headers: this.headers
        }).then((response) => {
          if (response.data.code === 0) {
            this.codeId = response.data.data
            this.$message({
              message: '保存成功',
              showClose: true,
              type: 'info'
            })
          }
        }, (response) => {
          console.log(response)
          this.$message({
            message: '错误码为: ' + response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      getUserInfo () {
        this.$http.get(API + 'user/info', {
          headers: this.headers
        }).then((response) => {
          if (response.data.code === 0) {
            this.form.mobile = response.data.data.mobile
            this.form.username = response.data.data.username
            this.form.email = response.data.data.email
            this.form.hobby = response.data.data.hobby
            this.form.age = response.data.data.age
            this.imageList = response.data.data.collectBook
          }
        }, (response) => {
          this.$message({
            message: '错误码为: ' + response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      logout () {
        window.localStorage.removeItem('user')
        this.show = true
        this.$message({
          message: '退出成功',
          showClose: true,
          type: 'info'
        })
        this.$router.push({path: '/login'})
      },
      Success (response, file) {
        this.bookForm.url = response.data
      },
      update () {
        this.$http.post(API + 'user/editPwd', this.updateForm, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '修改成功',
              showClose: true,
              type: 'info'
            })
          } else {
            this.$message({
              message: response.data.message,
              showClose: true,
              type: 'error'
            })
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      uploadBook () {
        console.log(this.bookForm)
        this.$http.post(API + 'user/upload', this.bookForm, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '上传成功',
              showClose: true,
              type: 'info'
            })
          } else {
            this.$message({
              message: response.data.message,
              showClose: true,
              type: 'error'
            })
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      select (index) {
        if (index === '1') {
          this.isBase = true
          this.isPwd = false
          this.isBook = false
        }
        if (index === '2') {
          this.isBase = false
          this.isPwd = true
          this.isBook = false
        }
        if (index === '3') {
          this.isBase = false
          this.isPwd = false
          this.isBook = true
        }
      }
    }
  }
</script>
<style scoped>
  .header{
    width: 100%;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index:1023;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    background-color: #EEEEEE;
  }
  .title{
    font-size:24px;
    line-height: 65px;
    margin-left: 80px;
    cursor: pointer;
  }
  .welcome {
    line-height: 65px;
    float:right;
    margin-right: 40px;
  }
  .logout{
    line-height: 65px;
    float:right;
    margin-right: 40px;
    cursor: pointer;
  }
  .logout:hover{
    color:#FF4949;
  }
  .sidebar{
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 200px;
    min-width: 45px;
    max-height: 100vh;
    height: 100%;
    z-index: 1023;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
    overflow-y: auto;
    overflow-x: hidden;
    background: #eff2f7;
  }
  .main{
    margin-top: 120px;
    margin-left: 400px;
    width: 40%;
  }
  .user-form{
    margin-top: 20px;
  }
</style>
