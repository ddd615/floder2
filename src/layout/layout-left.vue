<template>
  <el-aside
    width="200px"
    :style="{
    position: 'fixed',
    height: '100vh',
    left: 0,
    overflow: 'hidden',
    background: 'rgb(20, 31, 41)',
    boxSizing: 'border-box'
    }">
    <div ref="menuBlock" :style="'height:' + menuBlockHeight + 'px'" class="sider-menu-block">
      <el-menu
        background-color="rgba(20, 31, 41)"
        text-color="rgb(224, 225, 226)"
        active-text-color="#00A16C"
        unique-opened="true"
        @select="onSelect"
      >
        <template v-for="item,i in menuList">
          <el-submenu :index="i">
            <template slot="title"><i :class="item.icon"></i>{{$t(item.displayName)}}</template>
            <el-menu-item
              :index="i+'-'+j"
              v-if="!child.children"
              v-for="child,j in item.children"
            >
              {{child.displayName}}
            </el-menu-item>
            <el-submenu :index="i + '-' + j" v-else>
              <template slot="title">{{child.displayName}}</template>
              <el-menu-item
                v-for="c,k in child.children"
                :index="i + '-' + j + '-' + k"
                :key="k"
              >
                {{c.displayName}}
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
const menuList = require("./menuList.json")
export default {
  name: "SiLayoutLeft",
  data(){
    return{
      projectName: "floder后台管理系统",
      menuList: menuList,
      menuBlockHeight: 0
    }
  },
  mounted() {
    // 计算滚动区域高度
    // let logoHeight = this.$refs.siderLogo.offsetHeight;
    // this.menuBlockHeight = window.innerHeight - logoHeight;
  },
  methods:{
    onSelect(name,path){
      let menuList = this.menuList;
      let flag = typeof name === "number";
      let link = "/";
      let displayName = "";
      if (flag) {
        link = menuList[name].link;
        displayName = menuList[name].displayName;
      } else {
        let arr = name.split("-");
        if (arr.length === 2) {
          // 第二层数据
          link = menuList[arr[0]].children[arr[1]].link;
          displayName = menuList[arr[0]].children[arr[1]].displayName;
        } else {
          // 第三层数据
          link = menuList[arr[0]].children[arr[1]].children[arr[2]].link;
          displayName =
            menuList[arr[0]].children[arr[1]].children[arr[2]].displayName;
        }
      }
      this.$router.push(link);
    }
  }
}
</script>

<style lang="less" scoped>
  .sider-logo {
    // color: #19be6b;
    color: #57b382;
    width: 100%;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    margin: 10px 0;
  }
  .el-menu-item:hover{
    background:#57b382!important;

  }
</style>
