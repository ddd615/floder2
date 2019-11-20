<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
  import Layout from '@/layout'
export default {
  name: 'App',
  components:{
    Layout
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
</style>
