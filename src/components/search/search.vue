<template>
  <div class="search">
    <div class="search-block">
      <search-item
        :clear="clear"
        :key="i"
        v-for="item,i in searchItems"
        :item="item"
        @on-change="onChange"
      ></search-item>
      <slot></slot>
      <el-button class="search-btn" icon="md-search" type="primary" @click="onSearch">搜索</el-button>
      <el-button icon="md-refresh" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script>
  import SearchItem from "./search-item.vue";
  import { setTimeout } from "timers";
  export default {
    name: "SiSearch",
    props: {
      searchItems: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        keywords: {},
        clear: false
      };
    },
    components: {
      SearchItem
    },
    computed: {},
    methods: {
      onSearch() {
        this.$emit("on-search", this.keywords); // handle seach
      },
      onReset() {
        this.keywords = {};
        this.clear = true;
        setTimeout(() => {
          this.clear = false;
        }, 200);
        this.$emit("on-search", this.keywords); //  handle seach
      },
      onChange(obj) {
        let value = obj.value;
        if (value === -1 || value === "" || value === undefined) {
          delete this.keywords[obj.key]; // if value is undefined or "" or -1 delete it
        } else {
          this.keywords[obj.key] = obj.value;
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .search {
    .search-block {
      padding: 10px 20px;
      // background-color: #ffffff;
      .search-btn {
        margin: 0 10px;
      }
    }
  }
</style>
