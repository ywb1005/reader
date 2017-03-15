<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  <footers></footers>
  </div>
</template>

<script>
  import footers from 'components/footer.vue'
export default {
    name: 'app',
    components: {
      footers
    }
}
</script>

<style>
  @import "./styles/base.css";
</style>
