<template>
  <div class="header">
  	<div class="img">
  		<img src="../assets/index.png" />
  	</div>
    <div class="search">
    	<el-form ref="form" :model="form" label-width="90px">
    		<el-form-item label="搜索本站">
    			<el-input v-model="input" placeholder="请输入内容" icon="search"></el-input>
    		</el-form-item>
    	</el-form>
    </div>
    <div class="user">
    	<span class="spn">注册</span>
    	<img style="width: 20px;height: 25px;" src="../assets/line.png"/>
    	<span class="spn">登录</span>
    </div>
    <div class="menu">
   <el-dropdown>
  <span class="el-dropdown-link">
  <i class="el-icon-menu"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>注册</el-dropdown-item>
    <el-dropdown-item>登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
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
    height: 10%;
  }
  .img{
  	width: 10%;
  	height: 80px;
  	float: left;
  	margin-left:15% ;
    padding-top: 0.8%;
  }
  .search{
  	margin-left: 30%;
  	float: left;
  	width: 20%;
  	height: 80px;
  	padding-top: 1.5%;
  }
  .spn:hover{
  	color: #20A0FF;
  	text-decoration:underline
  }
  @media (min-width: 1024px){
  	.menu{
  		display: none;
  	}
	.user{
	  	width: 15%;
	  	height: 80px;
	  	margin-left: 2%;
	  	float: left;
	  	font-size: 22px;
	  	padding-top: 1.5%;
  	}
  }
  @media (min-width: 900px) and (max-width:1024px){
	.user{
	  	display: none;
  	}
  	.menu{
  		width: 10%;
	  	height: 80px;
	  	margin-left: 2%;
	  	float: left;
	  	padding-top: 2.5%;
  	}
  }
  @media (max-width: 900px){
  	.search{
  		display: none;
  	}
  	.user{
	  	display: none;
  	}
  	.menu{
  		width: 10%;
	  	height: 80px;
	  	margin-left: 30%;
	  	float: left;
	  	padding-top: 2.5%;
  	}
  }
</style>
