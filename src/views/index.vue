<template>
  <div>
    <header></header>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import header from 'components/header.vue'
  export default {
    components: {
      header
    },
    data () {
      return
    }
  }
</script>
<style>
  .bg-purple {
    background: #d3dce6;
  }
</style>
