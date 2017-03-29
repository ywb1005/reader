<template>
  <div class="header">
  		<router-link to="/"><img src="../assets/index.png" /></router-link>
    <el-form class="search" ref="form" :model="form" label-width="90px">
      <el-form-item label="搜索本站">
        <el-input v-model="input" placeholder="请输入内容" icon="search"></el-input>
      </el-form-item>
    </el-form>
    <div class="user">
    	<span class="spn" @click="dialogRegisterFormVisible = true">注册</span>
    	<span>|</span>
    	<span class="spn" @click="dialogLoginFormVisible = true">登录</span>
      <el-dialog title="书 屋 登 录" v-model="dialogLoginFormVisible" class="login">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="手机号\用户名\电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"  placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-button type="text" @click="dialogLoginFormVisible = false" class="btn" size="mini" style="padding-left: 20px">忘记密码?</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="smsLogin" size="mini" class="btn">短信快捷登录</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogLoginFormVisible = false" size="large">登 录</el-button>
          <el-button  @click="dialogFormVisible = false" size="large">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="书 屋 用 户 注 册" v-model="dialogRegisterFormVisible" class="register">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="手机号\用户名\电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"  placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <el-button type="text" @click="dialogRegisterFormVisible = false" class="btn" size="mini" style="padding-left: 20px">忘记密码?</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="smsLogin" size="mini" class="btn">短信快捷登录</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogRegisterFormVisible = false" size="large">登 录</el-button>
          <el-button  @click="dialogFormVisible = false" size="large">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogLoginFormVisible: false,
        dialogRegisterFormVisible: false,
        form: {
          username: '',
          password: ''
        },
        checked: false
      }
    },
    methods: {
      smsLogin () {
        this.$message({
          showClose: true,
          duration: 1000,
          message: '尚未开放,倾尽期待!'
        })
      }
    }
  }
</script>
<style>
  .header{
    position: fixed;
    top:0px;
    left: 0px;
    background-color:#EEEEEE;
    width: 100%;
    height: 70px;
    z-index: 2002;
    overflow: hidden;
    border-bottom: 1px solid #fff;
  }
  .header img{
  	float: left;
  	margin-left:15% ;
    padding-top: 0.8%;
  }
  .search .el-form-item{
  	padding-top: 20px;
    margin-left:30% ;
  	float: left;
  	height: 73px;
  }
  .spn:hover{
  	color: #20A0FF;
  	text-decoration:underline
  }
  .user{
    width: 15%;
    height: 80px;
    margin-right: 5%;
    float: right;
    font-size: 22px;
    padding-top: 1.5%;
  }
  .user span{
    font-size: 16px;
  }
  .dialog-footer{
    padding-left: 80px;
    text-align: left;
  }
  .login .el-dialog__body{
    padding-bottom: 0;
  }
  .btn{
    color:#8c939d;
  }
  .el-message{
    z-index: 11112;
  }
</style>
