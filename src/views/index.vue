<template>
<<<<<<< HEAD
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
=======
  <div class="container">
  		<headers></headers>
    <div class="row">
    <h1>asss</h1>
    </div>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  export default {
    components: {
      headers
>>>>>>> 1eb4a43ea05b919eb0de93dd71edaa8e25be19db
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
