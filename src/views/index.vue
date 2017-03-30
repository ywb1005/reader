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
        <div class="book-cell">
          <div class="cell-title">
            <h2>热门推荐</h2>
            <a class="cell-a">更多></a>
          </div>
          <div class="book-list" v-model="bookList">
            <ul v-for="book in bookList">
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
                <div class="book-author">
                	<span>作者:{{book.author}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="book-cell">
        <div class="cell-title">
            <h2>最新上架</h2>
            <a class="cell-a">更多></a>
          </div>
          <div class="book-list newbook" v-model="newBookList">
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
      this.$http.get(API + 'token', {
        params: {
          mobile: 18857120799
        }
      }).then((response) => {
        console.log(response.data)
      })
    },
    data () {
      return {
        bookList: [
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 1},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 2},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 3},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 4},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 5},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 6},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 7},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 8},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 9},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 10},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 11},
          {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 12}
        ],
        newBookList: [
        {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 1},
        {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 2},
        {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 3},
        {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 4},
        {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 5},
        {img: 'static/img/book.jpg', name: '天子谋', author: '叶伟标', id: 6}
        ]
      }
    }
  }
</script>
<style scoped>
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
    font-size: 22px;
    color: #5c5050;
    cursor:pointer;
  }
  .book-name span:hover{
  	color: 	#EE9A49;
  }
  .book-img img{
  	cursor:pointer;
  }
  .book-author span{
    font-size: 14px;
    color: #888;
  }
</style>
