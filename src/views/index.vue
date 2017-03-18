<template>
  <div>
    <headers></headers>
      <navbars></navbars>
    <div class="container">
      <div class="block">
        <el-carousel height="250px">
          <el-carousel-item v-for="item in 4">
            <div class="img">
              <a><img src="../assets/banner.jpeg" style="width: 100%; height: 100%;"></a>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="row">
        <div class="book-cell">
          <div class="cell-title">
            <h2>热门推荐</h2>
            <a class="cell-a">更多></a>
          </div>
          <div class="book-list" v-model="bookList">
            <ul v-for="book in bookList">
              <li>
                <div class="book-img"><img :src="book.img"></div>
                <div class="book-name"><span>&lt;{{book.name}}&gt;</span></div>
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
  export default {
    components: {
      headers, navbars
    },
    data () {
      return {
        bookList: [
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标'}
        ]
      }
    }
  }
</script>
<style>
  .block{
    width: 90%;
    height: 420px;
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
  .img{
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
  .book-cell{
    margin-top: 20px;
    margin-bottom: 80px;
  }
  .cell-a{
    float: right;
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
  }
  .book-list{
    width: 100%;
    height: 280px;
    margin-top: 20px;
    border: 1px solid #eee;
    overflow:hidden;
  }
  .book-name,.book-author{
    margin-top: 10px;
  }
  .book-name span{
    font-size: 22px;
    color: #5c5050;
  }
  .book-author span{
    font-size: 14px;
    color: #888;
  }
</style>