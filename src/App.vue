<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
  import Layout from '@/layout'

  export default {
    name: 'App',
    components: {
      Layout
    }
  }
</script>

<style lang="less">
  @import "./style/dialog.less";
  @import "./style/table.less";
  @import "./style/layoutLeft.less";
  @import "./style/button.less";
  @import "./style/card.less";
  *{
    margin: 0;
    padding: 0;
    font-family: 'Roboto','PingFang SC','Noto Sans CJK','WenQuanYi Micro Hei','Microsoft YaHei';
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}


  .el-input{
    width: 200px;
  }
  .el-input__inner{
    height: 35px;
    line-height: 35px;
  }
  /*表格行高*/

  /*.el-dialog{*/
  /*  .el-dialog__header{*/
  /*    background: #2c3e50;*/
  /*  }*/
  /*}*/
  /*.footor {*/
  /*  width: 100%;*/
  /*  height: 44px;*/
  /*  padding: 5px;*/
  /*  .pager-group {*/
  /*    float: right;*/
  /*    margin-right: 10px;*/
  /*    .pager-data {*/
  /*      display: inline-block;*/
  /*      margin-top: 5px;*/
  /*      margin-left: 20px;*/
  /*      margin-right: 20px;*/
  /*      .val {*/
  /*        color: red;*/
  /*      }*/
  /*    }*/
  /*    .pager {*/
  /*      display: inline-block;*/
  /*      vertical-align: middle;*/
  /*    }*/
  /*  }*/
  /*}*/
  .footor{
    margin:10px 30px;
    width: 90%;
    text-align: right;
  }
</style>
