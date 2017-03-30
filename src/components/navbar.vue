<template>
  <div class="navbar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item  index="1"><router-link to="/">首页</router-link></el-menu-item>
      <el-menu-item  index="3"><a href="https://www.ele.me" target="_blank">会员专区</a></el-menu-item>
      <el-menu-item  index="4">读书资讯</el-menu-item>
      <el-menu-item  index="5">热门书榜</el-menu-item>
      <el-menu-item  index="6">书友天下</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeIndex: 1
      }
    },
    methods: {
      handleSelect () {
        console.log('select')
      }
    }
  }
</script>
<style scoped>
  .navbar{
    width: 1252px;
    height: 60px;
    margin: 73px auto;
    margin-bottom: 0px;
    z-index: 1000;
  }
  .el-menu-item{
    padding:0 100px;
  }
</style>
