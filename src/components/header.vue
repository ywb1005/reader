<template>
  <div class="header">
  		<img src="../assets/index.png" />
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="搜索本站">
        <el-input v-model="input" placeholder="请输入内容" icon="search"></el-input>
      </el-form-item>
    </el-form>
    <div class="user">
    	<span class="spn">注册</span>
    	<img style="width: 20px;height: 25px;" src="../assets/line.png"/>
    	<span class="spn">登录</span>
    </div>
  </div>
</template>
<style>
  .header{
    position: fixed;
    top:0px;
    left: 0px;
    background-color:#EEEEEE;
    width: 100%;
    height: 73px;
    z-index: 11111;
    overflow: hidden;
    border-bottom: 1px solid #fff;
  }
  .header img{
  	float: left;
  	margin-left:15% ;
    padding-top: 0.8%;
  }
  .el-form-item{
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
    padding-top: 2%;
  }
  .user span{
    font-size: 16px;
  }
</style>
