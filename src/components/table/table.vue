<template>
  <div class="i-v-table">
    <div class="heading">
      <slot></slot>
    </div>
    <div class="body">

      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
<!--        首列选择框-->
        <el-table-column
          type="selection"
          width="55"
          align="center"
          v-if="hasSelection"
        >
        </el-table-column>
<!--        数据展示列-->
        <el-table-column
          :prop="col.key"
          :label="col.title"
          :align="col.align"
          :sortable="col.sortable"
          v-for="(col,colIndex) in columns"
          show-overflow-tooltip>
        </el-table-column>
<!--        操作按钮列-->
<!--        <el-table-column ref="fixedColumn" label="操作" align="center" :width="operates.width" :fixed="operates.fixed"-->
<!--                         v-if="operates.list.filter(_x=>_x.show === true).length > 0">-->
<!--          <template slot-scope="scope">-->
<!--            <div class="operate-group">-->
<!--              <template v-for="(btn, key) in operates.list">-->
<!--                <div class="item" v-if="btn.show" :key='btn.id'>-->
<!--                  <el-button :type="btn.type" size="mini" :icon="btn.icon" :disabled="btn.disabled"-->
<!--                             :plain="btn.plain" @click.native.prevent="btn.method(key,scope.row)">{{ btn.label }}-->
<!--                  </el-button>-->
<!--                </div>-->
<!--              </template>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <slot></slot>
      </el-table>
    </div>
    <div class="footor">
      <div class="pager-group">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SiTable",
    props: {
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      showFooter: {
        type: Boolean,
        default: true
      },
      total: {
        type: Number,
        default: 0
      },
      curPage: {
        type: Number,
        default: 1
      },
      showBorder: {
        type: Boolean,
        default: false
      },
      hasSelection: {
        type: Boolean,
        default: true,
      },
      operates: {
        type: Object,
        default: {},
      }
    },
    data() {
      return {
        pageSize: 10,
        selectList: [],
        currentPage4: 1,
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      };
    },
    watch: {
      data: {
        immediate: true,
        handler() {
          this.selectList = [];
        }
      }
    },
    computed: {
      pageCount() {
        let total = this.total;
        let pageSize = this.pageSize;
        let val1 = parseInt(total / pageSize);
        let val2 = total % pageSize;
        if (val2 > 0) {
          val1++;
        }
        return val1;
      }
    },
    methods: {
      handleSelectAll(selection, row) {},
      handleSelect(selection, row) {},
      handleSelectionChange(selection) {
        this.selectList = selection;
        this.$emit('on-selection-change',selection);
      },

      handleCurrentChange(val) {
        console.log(val);
        this.$emit("on-page-change", page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.$emit("on-page-size-change", pageSize);
        console.log(pageSize)
      },
      handleSortChange(sort) {
        this.$emit("on-sort-change", { key: sort.key, order: sort.order });
      },
    },
    mounted() {
      this.$on("on-get-selectList", () => {
        this.$emit("on-transport-selectList", this.selectList);
      });
    }
  };
</script>

<style lang="less" scoped>
  .i-v-table {
    width: 90%;
    position: relative;
    left: 30px;
    .heading {
      height: auto;
      width: 100%;
    }
    .body {
      background-color: #ffffff;
      .operate-group{
        display: flex;
        justify-content: space-around;
      }
    }

    .footor {
      width: 100%;
      height: 44px;
      padding: 5px;
      .pager-group {
        float: right;
        margin-right: 10px;
        .pager-data {
          display: inline-block;
          margin-top: 5px;
          margin-left: 20px;
          margin-right: 20px;
          .val {
            color: red;
          }
        }
        .pager {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
</style>
