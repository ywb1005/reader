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
						<el-tag type="primary" v-for="val in key" style="margin-left: 5px"> {{val}} </el-tag>
						<br />
						<br />
      			<span class="desc">摘要</span>
      			<p style="margin-bottom: 0px">{{this.desc}}</p>
 						<el-button type="info" @click="read(1)">立即阅读</el-button>
 						<el-button  @click="cancelCollect" v-if="collect">取消收藏</el-button>
            <el-button  type="info" @click="join" v-else="collect">加入收藏</el-button>
      		</div>
      	</div>
      	<div class="book-tab">
      			<el-tabs v-model="activeName">
    				<el-tab-pane label="作品下载" name="first">
                <el-button type="info" @click="downBook">点击下载此书</el-button>
    				</el-tab-pane>
    				<el-tab-pane label="目录" name="second" v-model="bookInfo">
    					<h3>全部章节（共{{this.length}}章）</h3>
    					<ul class="book-cat-ul">
    						<li class="book-cat-li" v-for="cat in bookInfo" @click="read(cat.id)"><span>第{{cat.nodeId}}章   {{cat.nodeName}}</span></li>
    					</ul>
    				</el-tab-pane>
    				<el-tab-pane label="评论专区" name="third" style="background-color: #EEEEEE;height: 700px;">
    					<div class="comment">
    						<el-form ref="form" :model="form" label-width="80px" style="padding-left:40px;height: 185px; border-bottom: 1px dashed #8C939D;">
  						<el-form-item style="margin: 0 auto;" label="新增评论">
    					<el-input type="textarea"
                        :rows="4" v-model="form.content" placeholder="请输入评论内容"></el-input>
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
  										<span style="color: #F7BA2A;font-size: 20px;">{{comment.username}}: </span>
  										<span>{{comment.comment}}</span>
  										<br /><br />
  										<span style="color: #8C939D;font-size: 14px;">{{comment.createTime}}</span>
  									</div>
  								</li>
  							</ul>
  						</div>
                <div class="block">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page.current"
                    :page-size="page.per"
                    layout="prev, pager, next, total"
                    :total="page.total">
                  </el-pagination>
                </div>
    					</div>
    				</el-tab-pane>
  					</el-tabs>
      	</div>
      </div>
  </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  import navbars from 'components/navbar.vue'
  const API = process.env.API
  let user = JSON.parse(window.localStorage.getItem('user'))
  export default {
    components: {
      headers, navbars
    },
    mounted () {
      this.getCommentList(this.form.page)
      this.catalog()
      this.getbookInfo()
      if (user !== null) {
        this.isCollect()
      }
    },
    data () {
      return {
        catName: '',
        collect: false,
        activeName: 'first',
        bookName: '',
        desc: '',
        url: '',
        form: {
          content: '',
          page: 1
        },
        author: '',
        bookInfo: [],
        key: [],
        length: 0,
        commentList: [],
        page: {
          current: 1,
          per: 5,
          total: 0,
          from: 1,
          to: 1,
          last: 1
        }
      }
    },
    methods: {
      isCollect () {
        let bookId = this.$route.params.id
        this.$http.post(API + 'user/collect/check', {bookId: bookId}, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            if (response.data.data === 1) {
              this.collect = true
            } else {
              this.collect = false
            }
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      cancelCollect () {
        let bookId = this.$route.params.id
        this.$http.post(API + 'user/collect/cancel', {bookId: bookId}, {
          headers: {
            'Authorization': 'Bearer ' + user.token
          }
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '取消收藏成功',
              showClose: true,
              type: 'info'
            })
            this.collect = false
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      read (section = 1) {
        let user = window.localStorage.getItem('user')
        if (user === null) {
          this.$message({
            message: '您还未登录,请先登录!',
            showClose: true,
            type: 'warning'
          })
        } else {
          this.$router.push({'path': this.$route.path + '/section/' + section})
        }
      },
      onSubmit () {
        if (user === null) {
          this.$message({
            message: '您还未登录,请先登录!',
            showClose: true,
            type: 'warning'
          })
        } else {
          let bookId = this.$route.params.id
          let param = {
            content: this.form.content
          }
          this.$http.post(API + 'book/comment/' + bookId, param, {
            headers: {
              'Authorization': 'Bearer ' + user.token
            }
          }).then((response) => {
            if (response.data.code === 0) {
              this.page.current = response.data.data.current_page
              this.page.per = response.data.data.per_page
              this.page.total = response.data.data.total
              this.page.last = response.data.data.last_page
              this.page.from = response.data.data.from
              this.page.to = response.data.data.to
              this.commentList = response.data.data.list
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
      handleCurrentChange (val) {
        this.page.current = val
        console.log(`当前页: ${val}`)
      },
      getCommentList (page = 1) {
        let bookId = this.$route.params.id
        let param = {
          page: page
        }
        this.$http.get(API + 'book/comment/' + bookId, {
          params: param
        }).then((response) => {
          if (response.data.code === 0) {
            this.page.current = response.data.data.current_page
            this.page.per = response.data.data.per_page
            this.page.total = response.data.data.total
            this.page.last = response.data.data.last_page
            this.page.from = response.data.data.from
            this.page.to = response.data.data.to
            this.commentList = response.data.data.list
          }
        }, (response) => {
          this.$message({
            message: response.data.message,
            showClose: true,
            type: 'error'
          })
        })
      },
      join () {
        let user = JSON.parse(window.localStorage.getItem('user'))
        let bookId = this.$route.params.id
        if (user === null) {
          this.$message({
            message: '您还未登录,请先登录!',
            showClose: true,
            type: 'warning'
          })
          return false
        }
        this.$http.post(API + 'user/collect', {bookId: bookId}, {
          headers: {'Authorization': 'Bearer ' + user.token}
        }).then((response) => {
          if (response.data.code === 0) {
            this.$message({
              message: '添加成功',
              showClose: true,
              type: 'info'
            })
            this.collect = true
          }
        }, (response) => {
          this.$message({
            message: '错误码为: ' + response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      catalog () {
        let bookId = this.$route.params.id
        this.$http.get(API + 'book/' + bookId + '/section', {
        }).then((response) => {
          if (response.data.code === 0) {
            this.bookInfo = response.data.data
            if (response.data.data === null) {
              this.length = 0
            } else {
              this.length = [this.bookInfo].length
            }
          }
        }, (response) => {
          this.$message({
            message: response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      getbookInfo () {
        let bookId = this.$route.params.id
        this.$http.get(API + 'book/' + bookId, {
        }).then((response) => {
          if (response.data.code === 0) {
            this.catName = response.data.data.category
            this.bookName = response.data.data.name
            this.author = response.data.data.author
            this.desc = response.data.data.abstract
            this.key = response.data.data.keyword
            this.url = response.data.data.downUrl
//            console.log(response)
          }
        }, (response) => {
          this.$message({
            message: response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      downBook () {
        let user = window.localStorage.getItem('user')
        if (user === null) {
          this.$message({
            message: '您还未登录,请先登录!',
            showClose: true,
            type: 'warning'
          })
          return false
        }
        let url = this.url
        let a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('download', '')
        let evObj = document.createEvent('MouseEvents')
        evObj.initEvent('click', true, true)
        a.dispatchEvent(evObj)
        this.downLog()
      },
      downLog () {
        let bookId = this.$route.params.id
        this.$http.post(API + 'user/download', {bookId: bookId}, {
          headers: {'Authorization': 'Bearer ' + user.token}
        }).then((response) => {
          if (response.data.code === 0) {
            console.log(response.data)
          }
        }, (response) => {
          this.$message({
            message: '错误码为: ' + response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      }
    },
    watch: {
      'page.current' (val) {
        this.form.page = val
        this.getCommentList(this.form.page)
      }
    }
  }
</script>
<style scoped>
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
    margin-left: 40px;
  }
  .comment-btn{
    margin-top: 20px;
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
  .block{
    float: right;
  }
</style>
