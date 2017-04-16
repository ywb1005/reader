<template>
  <div class="navbar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item  index="/">首页</el-menu-item>
      <el-menu-item  index="/a">会员专区</a></el-menu-item>
      <el-menu-item  index="/b">读书资讯</el-menu-item>
      <el-menu-item  index="/c">热门书榜</el-menu-item>
      <el-menu-item  index="/d">书友天下</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        activeIndex: '/'
      }
    },
    methods: {
      handleSelect (index) {
        this.activeIndex = index
        console.log(index)
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
