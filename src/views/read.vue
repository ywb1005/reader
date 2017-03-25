<template>
  <div>
    <headers></headers>
    <div class="breadcrumb">
      	<el-breadcrumb separator="/">
  		<el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
  		<el-breadcrumb-item :to="{ path: '/cat/' }" >{{catName}}</el-breadcrumb-item>
  		<el-breadcrumb-item :to="{ path: '/' }">{{bookName}}</el-breadcrumb-item>
		</el-breadcrumb>
      </div>
    <div class="container">
    
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
    }
  }
</script>
<style>
  .breadcrumb{
  	width: 1252px;
  	margin: 0 auto;
  	margin-top: 80px;
}
</style>
