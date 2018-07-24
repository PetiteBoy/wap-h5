<template>
  <div id="app">
    <top class="top"></top>
    <router-view/>
  </div>
</template>

<script>
import Top from './components/Top.vue'
import $store from './store'
export default {
  name: 'App',
  $store,
  components: {
    Top
  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 46px;
}
.top {
  box-shadow: 0px 1px 3px 0px rgba(140, 140, 140, 0.5);
}
</style>
