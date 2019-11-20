<template>
  <el-header style="position:fixed;top: 0;width:100%;display: flex;padding: 0;height: 48px">
    <div class="sider-logo">{{projectName}}</div>
    <div class="head-setting">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item,index) in breadcrumbList"
          :to="{ path: item.path }"
        >
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <span>王小虎</span>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "layout-header",
  data(){
   return{
     projectName: 'floder后台管理系统',
     breadcrumbList:[]
   }
  },
  created() {
    this.breadcrumbList = this.$route.meta.breadcrumb;
  }

}
</script>

<style lang="less" scoped>
  .sider-logo {
    color: #57b382;
    background: rgb(20, 31, 41);
    width: 199px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .head-setting{
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    box-shadow: 0 1px 2px 0 rgba(9,18,26,0.06), 0 4px 8px 0 rgba(39,56,73,0.08);
    padding: 0 20px;
    background: #fff;
    >span{
      font-size: 12px;
    }
  }
</style>
