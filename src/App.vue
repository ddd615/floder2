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
  @import "../static/font/font.css";
  *{
    margin: 0;
    padding: 0;
    font-family: '思源黑体';
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
  .el-button{
    border-radius: 2px;
    padding: 12px 16px;
  }
  .el-button--primary{
    background: #00a16c;
    border: none;
  }
  .el-input{
    width: 200px;
  }
  .el-input__inner{

  }
</style>
