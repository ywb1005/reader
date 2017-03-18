<template>
  <div class="navbar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item  index="1">首页</el-menu-item>
      <el-menu-item  index="3"><a href="https://www.ele.me" target="_blank">会员专区</a></el-menu-item>
      <el-menu-item  index="4">读书资讯</el-menu-item>
      <el-menu-item  index="5">热门书榜</el-menu-item>
      <el-menu-item  index="6">书友天下</el-menu-item>
    </el-menu>
  </div>
</template>
<style>
  .navbar{
    width: 100%;
    height: 60px;
    position: absolute;
    top:74px;
    left: 0px;
    z-index: 1111;
  }
  .el-menu{
    overflow: scroll;
  }
  .el-menu-item{
    padding:0 50px;
  }
</style>
