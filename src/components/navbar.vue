<template>
  <div class="navbar">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item class="item"  index="1">首页</el-menu-item>
      <el-menu-item class="item" index="3"><a href="https://www.ele.me" target="_blank">会员专区</a></el-menu-item>
      <el-menu-item class="item" index="4">读书资讯</el-menu-item>
      <el-menu-item class="item" index="5">热门书榜</el-menu-item>
      <el-menu-item class="item" index="6">书友天下</el-menu-item>
    </el-menu>
  </div>
</template>
<style>
  .navbar{
    width: 100%;
    height: 10%;
    position: fixed;
    top:74px;
    left: 0px;
    z-index: 1111;
  }
  @media (min-width: 1248px) {
    .item{
    padding:0 8%;
    }
    @media (min-width: 900px) and (max-width:1248px){
      .item{
        padding:0 6%;
      }
    }
  }
</style>
