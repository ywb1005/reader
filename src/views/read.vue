<template>
  <div class="body">
    <headers></headers>
    <div class="container" id="box">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/cat/' }" >{{catName}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">{{bookName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="base_set">
        <ul style="padding: 0;margin: 0">
          <router-link :to="{path: '/book/'+this.$route.params.id}">
          <li class="set_list" style="border-right: 0px">
            <i class="fa fa-list fa-fw" style="color: black;"></i>
            <span class="set-spn">返回书籍</span>
          </li>
          </router-link>
          <li class="set_list" style="border-right: 0px" v-on:mouseover="showMenu"><i class="fa fa-wrench fa-fw"></i><span class="set-spn">选择背景</span>
            <ul class="down-menu">
            <li class="down-list" v-for="theme in themeList" @click="changeColor(theme.id)" v-bind:class="{'change-down':flag==theme.id}">{{theme.name}}</li>
          </ul></li>
          <li class="set_list" @click="changeMoon" id="moon"><i class="fa fa-moon-o fa-fw"></i><span class="set-spn">夜间模式</span></li>
        </ul>
      </div>
      <div class="content">
        <div style="float: left;">
          <img style="width: 200px; " :src="image">
        </div>
        <div style="float: left;">
          <h2 style="margin-left: 260px;margin-top: 30px">{{this.index}}. {{this.sectionName}}</h2>
          <span style="margin-left: 260px;margin-top: 30px">作者: {{this.author}}</span>
        </div>
        <div class="content_txt">
          <p class="txt-p" v-for="content in contentList">{{content}}</p>
        </div>
      </div>
      <div class="select-section">
          <ul style="padding: 0;margin:0 auto;display:table;">
            <li class="select-section-list">
              <el-button type="text" @click="prev" style="padding: 6px" :disabled="prevFlag">上一章</el-button>
            </li>
            <li class="select-section-list">
              <el-button type="text" @click="dialogTableVisible = true" style="padding: 6px">目录</el-button>
              <el-dialog title="全部章节" v-model="dialogTableVisible">
                  <ul style="padding: 0;margin:0 auto;display:table;">
                    <li class="book-menu" v-for="book in bookInfo"><span>第{{book.nodeId}}章  {{book.nodeName}}</span></li>
                  </ul>
              </el-dialog>
            </li>
            <li class="select-section-list">
              <el-button type="text" @click="next" style="padding: 6px" :disabled="nextFlag">下一章</el-button>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  const API = process.env.API
  export default {
    components: {
      headers
    },
    mounted () {
      let bookId = this.$route.params.id
      let id = this.$route.params.sectionId
      this.catalog()
      this.getbookInfo(bookId, id)
    },
    data () {
      return {
        catName: '',
        bookName: '',
        dialogTableVisible: false,
        image: '',
        index: '',
        sectionName: '',
        isMoon: true,
        flag: 1,
        isStart: true,
        isEnd: false,
        author: '',
        contentList: [],
        bookInfo: [],
        prevFlag: false,
        nextFlag: false,
        themeList: [
          {id: 1, name: '默认'},
          {id: 2, name: '浅灰'},
          {id: 3, name: '蓝色'},
          {id: 4, name: '绿色'},
          {id: 5, name: '深灰'}
        ]
      }
    },
    methods: {
      changeColor (id = 1) {
        this.flag = id
        switch (id) {
          case 1:
            document.getElementsByClassName('body')[0].style.backgroundColor = 'antiquewhite'
            document.getElementById('box').style.backgroundColor = '#fcf5ed'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#fcf5ed'
            break
          case 2:
            document.getElementsByClassName('body')[0].style.backgroundColor = '#efefef'
            document.getElementById('box').style.backgroundColor = '#f7f7f7'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#f7f7f7'
            break
          case 3:
            document.getElementsByClassName('body')[0].style.backgroundColor = '#d2e6fa'
            document.getElementById('box').style.backgroundColor = '#ebf5ff'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#ebf5ff'
            break
          case 4:
            document.getElementsByClassName('body')[0].style.backgroundColor = '#d2efc3'
            document.getElementById('box').style.backgroundColor = '#eafae1'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#eafae1'
            break
          case 5:
            document.getElementsByClassName('body')[0].style.backgroundColor = '#201c1d'
            document.getElementById('box').style.backgroundColor = '#353434'
            document.getElementById('box').style.color = '#9a9a9a'
            document.getElementById('moon').style.backgroundColor = '#4db3ff'
            this.isMoon = false
            break
        }
        document.getElementsByClassName('down-menu')[0].style.display = 'none'
      },
      showMenu () {
        document.getElementsByClassName('down-menu')[0].style.display = 'block'
      },
      changeMoon () {
//        console.log(this.isMoon)
        if (this.isMoon) {
          this.changeColor(5)
          document.getElementById('moon').style.backgroundColor = '#4db3ff'
          this.isMoon = false
        } else {
          this.changeColor(1)
          this.isMoon = true
        }
      },
      catalog () {
        let bookId = this.$route.params.id
        this.$http.get(API + 'book/' + bookId + '/section', {
        }).then((response) => {
          if (response.data.code === 0) {
            this.bookInfo = response.data.data
          }
        }, (response) => {
          this.$message({
            message: response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      getbookInfo (bookId, id) {
        this.$http.get(API + 'book/' + bookId + '/section/' + id, {
        }).then((response) => {
          if (response.data.code === 0) {
            this.catName = response.data.data.category
            this.bookName = response.data.data.name
            this.author = response.data.data.author
            this.contentList = response.data.data.content
            this.image = response.data.data.nodeImg
            this.sectionName = response.data.data.nodeName
            this.index = response.data.data.nodeId
          }
        }, (response) => {
          this.$message({
            message: response.data.data,
            showClose: true,
            type: 'error'
          })
        })
      },
      prev () {
        let id = this.$route.params.sectionId
        if (parseInt(id) === 1) {
          this.prevFlag = true
          this.$message({
            message: '主人,没有上一章了',
            showClose: true,
            type: 'warning'
          })
        } else {
          let bookId = this.$route.params.id
          this.$router.push({path: '/book/' + bookId + '/section/' + parseInt(id - 1)})
          this.$router.go(0)
        }
      },
      next () {
//        console.log([this.bookInfo][0].length)
        let id = this.$route.params.sectionId
        if (this.bookInfo !== null) {
          if (parseInt(id) === [this.bookInfo][0].length) {
            this.nextFlag = true
            this.$message({
              message: '主人,没有下一章了',
              showClose: true,
              type: 'warning'
            })
          } else {
            let bookId = this.$route.params.id
            let section = parseInt(id) + 1
            this.$router.push({path: '/book/' + bookId + '/section/' + section})
            this.$router.go(0)
          }
        }
      }
    }
  }
</script>
<style scoped>
  .body{
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
  }
  .container{
    width: 1190px;
    height: auto;
    margin: 80px auto 0;
    border: 1px solid #8c939d;
    border-radius: 4px;
    box-shadow: 0 0 5px #dcdcdc;
    background-color: #fcf5ed;
  }
  .breadcrumb{
  	width: 600px;
    margin-top: 20px;
    margin-left: 4%;
    float: left;
  }
  .breadcrumb .el-breadcrumb{
    height: 20px;
    padding-top: 20px;
    font-size: 18px;
  }
  .base_set{
    margin-right: 6%;
    float: right;
  }
  .set_list{
    width: 100px;
    height: 30px;
    float: left;
    cursor: pointer;
    padding-top: 5px;
    margin-top: 20px;
    border: 1px solid #8c939d;
  }
  .set-spn{
    line-height: normal;
    font-size: 18px;
    color: black;
  }
  .set-spn:hover{
    color: #eeeeee;
  }
  .set_list:hover{
    background-color: #4db3ff;
  }
  .content{
    width: 90%;
    height: auto;
    clear: both;
    margin: 0 auto;
    border-bottom: 1px solid #8c939d;
  }
  .txt-p{
    font-size: 18px;
    text-indent: 2cm;
    line-height: 1.8;
    margin: 0.8em;
  }
  .select-section{
    width: 90%;
    height: 100px;
    margin: 10px auto;
  }
  .select-section-list{
    padding: 10px 20px;
    font-size: 18px;
    float: left;
    margin-left:20px;
    margin-top: 40px;
    border-radius: 4px;
    border: 1px solid #8c939d;
  }
  .select-section-list:hover{
    background-color: #ffffff;
    color: bisque;
    cursor: pointer;
  }
  .down-menu{
    padding: 0;
    cursor: pointer;
    border: 1px solid #8c939d;
    margin-top: 6px;
    display: none;
  }
  .down-menu .down-list{
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    padding-top: 5px;
    padding-left: 5px;
  }
  .down-menu .down-list:hover{
    background-color: #f5f5f5;
  }
  .change-down{
    background-color: #4db3ff;
  }
  .book-menu{
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 200px;
    border-bottom: 1px solid #8c939d;
  }
  .book-menu span:hover{
    color: #dea726;
  }
  .content_txt{
    clear: both;
  }
</style>
