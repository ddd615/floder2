<template>
  <el-header style="position:fixed;top: 0;width:100%;display: flex;padding: 0;height: 48px">
    <div class="sider-logo">{{$t('message.projectName')}}</div>
    <div class="head-setting">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item,index) in breadcrumbList"
          :to="{ path: item.path }"
        >
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div>
<!--        选择国际化语言-->
        <el-select v-model="selectValue" @change="langChange" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span>{{store.user.nickname}}</span>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: "layout-header",
  data(){
   return{
     projectName: 'litchi后台管理系统',
     // breadcrumbList:[]
     selectValue:'',
     options:[
       {
         value: 'zh',
         label: '中文'
       }, {
         value: 'en',
         label: 'English'
       }
     ],
   }
  },
  computed:{
    breadcrumbList(){
      return this.$route.meta.breadcrumb;
    },
    store(){
      return this.$store.state;
    }
  },
  methods:{
    langChange(e){
      // console.log(e)
      localStorage.setItem('name_language',e);
      this.$i18n.locale = e;
    }
  },
  created() {
    this.breadcrumbList = this.$route.meta.breadcrumb;
    this.selectValue = localStorage.getItem('name_language') || 'zh'
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
