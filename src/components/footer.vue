<template>
  <div class="footer">
    <div class="font">
      <span>Copyright 一页书屋 &copy; {{date}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    created () {
      this.date = new Date().getFullYear()
    },
    data () {
      return {
        data: ''
      }
    }
  }
</script>
<style>
  .footer{
    width: 100%;
    height: 40px;
    position: absolute;
    z-index:999;
    padding: 10px;
    border: 1px solid #eee;
  }
  .font{
    padding-top: 1%;
    text-align: center;
    margin: 0 auto;
  }
</style>
