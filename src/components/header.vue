<template>
  <div class="header">
  		<router-link :to="{path: '/'}"><img src="../assets/index.png" /></router-link>
    <el-form class="search" :model="searchForm" label-width="90px">
      <el-form-item label="搜索本站">
        <el-input v-model="searchForm.key" placeholder="请输入内容" icon="search" :on-icon-click="search"></el-input>
      </el-form-item>
    </el-form>
    <div class="user" v-if="show">
    	<span class="spn"><router-link :to="{path: '/register'}">注 册</router-link></span>
    	<span>|</span>
    	<span class="spn"><router-link :to="{path: '/login'}">登 录</router-link></span>
    </div>
    <div class="user" v-else>
      <span class="spn"><router-link :to="{path: '/register'}">个 人 中 心</router-link></span>
      <span>|</span>
      <span class="spn" @click="logout">退 出</span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  const API = process.env.API
  export default {
    created () {
      let user = window.localStorage.getItem('user')
      this.user = user
    },
    data () {
      return {
        searchForm: {
          key: ''
        },
        show: true,
        user: ''
      }
    },
    methods: {
      logout () {
        window.localStorage.removeItem('user')
        this.show = true
        this.$message({
          message: '退出成功',
          showClose: true,
          type: 'info'
        })
      },
      search () {
        let param = {
          key: this.searchForm.key
        }
        this.$http.get(API + 'search', {
          params: param
        }).then((response) => {
          if (response.data.code === 0) {
            this.$router.push({'path': '/book/' + response.data.data.id})
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
      }
    },
    watch: {
      user: function (val) {
        if (val === null) {
          this.show = true
        } else {
          this.show = false
        }
      }
    }
  }
</script>
<style scoped>
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
  a:hover{
    color: #20A0FF;
  }
  a{
    color: black;
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
    cursor: pointer;
    font-size: 16px;
  }
  .dialog-footer{
    padding-left: 80px;
    text-align: left;
  }
  .login{
    z-index: 2005;
  }
  .register{
    z-index: 2005;
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
