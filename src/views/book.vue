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
      			<span class="spn">{{author}} 著</span>
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
 						<el-button type="info" @click="read(1)">立即阅读</el-button>
 						<el-button type="info">加入收藏</el-button>
      		</div>
      	</div>
      	<div class="book-tab">
      			<el-tabs v-model="activeName">
    				<el-tab-pane label="作品信息" name="first">
    					<p>四大皆空很好但是时间快点发货金色都汇收到回复客户</p>
    					<p>四大皆空很好但是时间快点发货金色都汇收到回复客户</p>
    				</el-tab-pane>
    				<el-tab-pane label="目录" name="second" v-model="bookInfo">
    					<h3>全部章节（共{{bookInfo.length}}章）</h3>
    					<ul class="book-cat-ul">
    						<li class="book-cat-li" v-for="cat in bookInfo" @click="read(cat.id)"><span>第{{cat.id}}章   {{cat.name}}</span></li>
    					</ul>
    				</el-tab-pane>
    				<el-tab-pane label="评论专区" name="third" style="background-color: #EEEEEE;height: 700px;">
    					<div class="comment">
    						<el-form ref="form" :model="form" label-width="80px" style="padding-left:40px;height: 185px; border-bottom: 1px dashed #8C939D;">
  						<el-form-item style="margin: 0 auto;" label="新增评论">
    					<el-input type="textarea"
                        :rows="4" v-model="form.name" placeholder="请输入评论内容"></el-input>
  						</el-form-item>
  						<el-form-item style="padding: 0px;margin-left: 0px;" class="comment-btn">
  							<el-button type="primary" @click="onSubmit">评论</el-button>
  						</el-form-item>
  						</el-form>
  						<div class="comment-list">
  							<ul style="width: 100%;height: 100%;padding:0px;margin: 0;">
  								<li class="comment-li" v-for="comment in commentList">
  									<div class="user-head" >
  										<img style="width: 64px;height: 64px;" src="../assets/user.png" />
  									</div>
  									<div class="comment-info">
  										<span style="color: #F7BA2A;font-size: 20px;">{{comment.user}}: </span>
  										<span>{{comment.info}}</span>
  										<br /><br />
  										<span style="color: #8C939D;font-size: 14px;">2017-04-01 12:00:52</span>
  									</div>
  								</li>
  							</ul>
  						</div>
    					</div>
    				</el-tab-pane>
  					</el-tabs>
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
        activeName: 'first',
        bookName: '盗天仙途',
        form: {
          name: ''
        },
        author: '荆轲守',
        bookInfo: [
        {id: 11, name: '蔑视真的是'},
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
        {id: 22, name: '无敌更好'}
        ],
        commentList: [
          {id: 1, user: '叶伟标', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 2, user: '大师傅似的', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 1, user: '叶伟标', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 2, user: '大师傅似的', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 1, user: '叶伟标', info: '大师傅大师傅但是示范点发射点顺丰速递'}
        ]
      }
    },
    methods: {
      read (section = 1) {
        console.log(this.$route.path)
        this.$router.push({'path': this.$route.path + '/section/' + section})
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
  	height: 300px;
  	margin-top: 20px;
  	border: 1px solid #8C939D;
  	border-bottom: 1px solid #FFFFFF;
  	margin-bottom: 40px;
  	border-radius: 5px;
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
  .book-info .el-button{
  	margin-bottom: 20px;
  }
  .book-cat-ul{
  	padding: 0px;
  	margin: 0px;
  }
  .book-cat-li{
    font: 14px/40px PingFangSC-Regular,'-apple-system',Simsun;
  	width: 290px;
  	padding-right: 23px;
  	float: left;
  	text-align: left;
  	cursor: pointer;
  	border-bottom: 1px solid #EEEEEE;
  }
  .book-cat-li span:hover{
    color: #dea726;
  }
  .book-tab{
  	height: 100%;
  	margin-bottom: 60px;
  }
  .comment .el-form-item{
  	width: 98%;
  }
  .comment-btn .el-form-item__content{
    padding-top: 40px;
  }
  .el-input{
  	width:80%;
  	float: left;
  }
  .comment{
  	width: 64%;
  	height: 100%;
  	margin: 0 auto;
  	background-color: #FFFFFF;
  }
  .comment-list{
  	margin: 0 auto;
  	height: 450px;
  }
  .comment-li{
  	height: 70px;
  	margin-top: 20px;
  	border-bottom: 1px dashed #888888;
  }
  .user-head{
  	width: 64px;
  	height: 64px;
  	float: left;
  	margin-left: 10px;
  }
  .comment-info{
  	float: left;
  	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .comment-info span{
  }
</style>
