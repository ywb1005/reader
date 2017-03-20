<template>
  <div>
    <headers></headers>
    <navbars></navbars>
    <div class="breadcrumb">
      	<el-breadcrumb separator="/">
  		<el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
  		<el-breadcrumb-item :to="{ path: '/cat/' }" >{{catName}}</el-breadcrumb-item>
  		<el-breadcrumb-item :to="{ path: '/' }">{{bookName}}</el-breadcrumb-item>
		</el-breadcrumb>
      </div>
    <div class="container">
      <div class="row">
      	<div class="info">
      		<div class="book-img">
      			<img src="../../static/img/180.jpg"/>
      		</div>
      		<div class="book-info">
      			<h2>{{bookName}}</h2>
      			<span class="spn">叶伟标 著</span>
      			<br />
      			<br />
      			<el-tag>标签一</el-tag>
						<el-tag type="gray">标签二</el-tag>
						<el-tag type="primary">标签三</el-tag>
						<el-tag type="success">标签四</el-tag>
						<el-tag type="warning">标签五</el-tag>
						<el-tag type="danger">标签六</el-tag>
						<br />
						<br />
      			<span class="desc">摘要</span>
      			<p>故事发生在1866年,法国人阿龙纳斯,一位生物学家,应邀赴美参加一项科学考察活动.这时,海上出了个怪物,在全世界闹得沸沸扬扬.科考活动结束之后,生物学家正准备束装就道,返回法国,却接到美国海军部的邀请,于是改弦更张,登上了一艘驱逐舰林肯号,参与“把那个怪物从海洋中清除出去 ”的活动.
经过千辛万苦</p>
 						<el-button type="info">立即阅读</el-button>
 						<el-button type="info">加入收藏</el-button>
      		</div>
      		<div class="section">
      			<h3>全部章节</h3>
      			<ul>
      				<li v-for="book in bookInfo">
      					<a>第{{book.id}}章 {{book.name}}</a>
      					</li>
      			</ul>
      		</div>
      	</div>
      </div>
  </div>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  import navbars from 'components/navbar.vue'
  export default {
    components: {
      headers, navbars
    },
    data () {
      return {
        catName: '存储',
        bookName: '盗天仙途',
        bookInfo: [
        {id: 11, name: '蔑视'},
        {id: 12, name: '骑士'},
        {id: 13, name: '无敌'},
        {id: 14, name: '蔑视'},
        {id: 15, name: '骑士'},
        {id: 16, name: '无敌'},
        {id: 17, name: '蔑视'},
        {id: 18, name: '骑士'},
        {id: 19, name: '无敌'},
        {id: 20, name: '蔑视'},
        {id: 21, name: '骑士'},
        {id: 22, name: '无敌'}
        ]
      }
    }
  }
</script>
<style>
  .breadcrumb{
  	width: 1252px;
  	margin: 0 auto;
  	margin-top: 40px;
  }
  .info{
  	width: 98%;
  	height: 600px;
  	margin-top: 20px;
  	border: 1px solid #8C939D;
  	margin-bottom: 40px;
  	overflow: hidden;
  	/*background-color: #EEEEEE;*/
  }
  .book-img{
  	width: 200px;
  	height: 200px;
  	margin-left: 80px;
  	margin-top: 50px;
  	float: left;
  	}
  .book-info{
  	margin-top: 50px;
  	width: 70%;
  	float: left;
  }
  .book-info h2{
  	display: inline;
  }
  .spn{
  	color: #8C939D;
  	font-size: 16px;
  	padding-left: 20px;
  }
  .desc{
  	color: brown;
  	font-size: 20px;
  }
  .book-info p{
  	color: #8C939D;
  }
  .el-button{
  	margin-bottom: 20px;
  }
  .section{
  	clear: both;
  	width: 100%;
  	height: 250px;
  	padding-top: 20px;
  	margin-left: 60px;
  	overflow: hidden;
  }
  .section ul {
  	padding: 0;
  	list-style: none;
  }
  .section li{
  	padding-left: 10px;
  	padding-top: 15px;
  	float: left;
  }
  .section a{
  	padding: 3px;
  	font-size: 20px;
  	color: brown;
  	background-color: #50bfff;
    border-radius: 5px;
  	border: 1px solid #EEEEEE;
  }
  .section a:hover{
    background-color: #ffffff;
    color: red;
    cursor: pointer;
  }
</style>
