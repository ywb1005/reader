<template>
  <div>
    <header></header>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  export default {
    components: {
      headers
    }
  }
</script>
<style>
.container{
	width: 100%;
	height: 100%;
}
.row{
  position: relative;
  top: 22px;
  width: 90%;
 	height: 100%;
	background-color: #20A0FF;
 }
</style>
