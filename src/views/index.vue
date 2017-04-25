<template>
  <div>
    <headers></headers>
      <navbars></navbars>
    <div class="container">
      <div class="block">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in 3">
              <a><img src="../assets/banner.jpeg"></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="row">
        <div class="book-cell" v-loading="hotloading"
             element-loading-text="拼命加载中"
             style="width: 100%">
          <div class="cell-title">
            <h2>热门推荐</h2>
            <a class="cell-a">更多></a>
          </div>
          <div class="book-list">
            <ul v-for="book in bookList">
              <li class="book-li">
                <div class="book-img">
                	<router-link :to="{ path: '/book/'+book.id }">
                		<img :src="book.img">
                	</router-link>
                </div>
                <div class="book-name">
                	<router-link :to="{ path: '/book/'+book.id }">
                		<span>&lt;{{book.name}}&gt;</span>
                	</router-link>
                </div>
                <div class="book-author">
                	<span>作者:{{book.author}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="book-cell" v-loading="newloading">
        <div class="cell-title">
            <h2>最新上架</h2>
            <a class="cell-a">更多></a>
          </div>
          <div class="book-list newbook">
            <ul v-for="book in newBookList">
              <li>
                <div class="book-img">
                	<router-link :to="{ path: '/book/'+book.id }">
                		<img :src="book.img">
                	</router-link>
                </div>
                <div class="book-name">
                	<router-link :to="{ path: '/book/'+book.id }">
                		<span>&lt;{{book.name}}&gt;</span>
                	</router-link>
                </div>
                <div class="book-author"><span>作者:{{book.author}}</span></div>
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
  const API = process.env.API
  export default {
    components: {
      headers, navbars
    },
    mounted () {
      this.$http.get(API + 'index', {
      }).then((response) => {
        console.log(response.data.code)
        if (response.data.code === 0) {
          let hot = response.data.data.hot
          let newbook = response.data.data.new
          for (let i in hot) {
            let book = {
              id: hot[i].id,
              name: hot[i].name,
              author: hot[i].author,
              img: '/static/img/book.jpg'
            }
            this.bookList.push(book)
            this.hotloading = false
          }
          for (let j in newbook) {
            let book = {
              id: newbook[j].id,
              name: newbook[j].name,
              author: newbook[j].author,
              img: '/static/img/book.jpg'
            }
            this.newBookList.push(book)
            this.newloading = false
          }
        }
      })
    },
    data () {
      return {
        bookList: [],
        hotloading: true,
        newloading: true,
        newBookList: []
      }
    }
  }
</script>
<style scoped>
  body{
    padding: 0;
    background-color: #ffffff;
  }
  .block{
    width: 1252px;
    height: 250px;
    margin: 0 auto;
    background-color: #8c939d;
    z-index: 999;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item img{
    width: 100%;
    height: 250px;
    background-repeat:repeat-x;
  }
  .book-cell{
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .cell-a{
    float: right;
    cursor:pointer;
  }
  .cell-title h2{
    display: inline;
  }
  .book-list ul{
    list-style: none;
  }
  .book-list li{
    float: left;
    padding: 20px;
    margin: 5px;
    border: 1px solid #20A0FF;
  }
  .book-list{
    width: 99%;
    height: 580px;
    margin-top: 20px;
    border: 1px solid #EEEEEE;
  }
  .newbook{
  	height: 290px;
  }
  .book-name,.book-author{
    margin-top: 10px;
  }
  .book-name span{
    display: block;
    width:140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
    color: #5c5050;
    cursor:pointer;
  }
  .book-name span:hover{
  	color: 	#EE9A49;
  }
  .book-img img{
    width: 142px;
    height: 142px;
  	cursor:pointer;
  }
  .book-author span{
    font-size: 14px;
    color: #888;
  }
  .book-li{
    width: 142px;
    height: 210px;
  }
</style>
