<template>
  <el-row class="page">

    <el-col :span="24">
      <search
        style="margin: 10px 30px;"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
    </el-col>
    <el-col :span="24" style="margin: 10px 30px;">
      <el-button style="background: rgb(0, 161, 108);border: none" icon="el-icon-plus"  type="primary" @click="toCreate">新建</el-button>
      <el-button icon="el-icon-delete" @click="batchDelete">删除</el-button>
      <el-button icon="el-icon-circle-check" @click="batchEnable" :disabled="!selectList.findIndex(s=>{return s.status === '启用'}) || selectList.length === 0">启用</el-button>
      <el-button icon="el-icon-circle-close" @click="batchDisable" :disabled="!selectList.findIndex(s=>{return s.status === '禁用'}) || selectList.length === 0">禁用</el-button>
    </el-col>
    <el-col :span="24">
      <i-table
        @on-transport-selectList="handleTransportSelectList"
        @on-page-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
        @on-selection-change="handleSelectionChange"
        :data="data"
        :total="total"
        :curPage="page"
        :columns="columns"
        :operates="operates"
      >
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.status.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>

          </template>
        </el-table-column>
      </i-table>
    </el-col>
  </el-row>
</template>
<script>
  import Search from "@/components/search";
  import ITable from "@/components/table";
  // import IModal from "@/components/modal";
  import { post } from "@/libs/http/request";
  import Emitter from '@/mixins/emitter'
  const LIST_URL = "/api/manager/search";
  const COUNT_URL = "/api/manager/count";
  const DELETE_URL = "/api/manager/delete";
  const BATCH_DELETE_URL = "/api/manager/delete";
  const ENABLE_URL = "/api/manager/enable";
  const DISABLE_URL = "/api/manager/disable";
  export default {
    mixins:[Emitter],
    data() {
      return {
        model: "manager",
        columns: [
          {
            title: "账号",
            key: "username",
            align: "center"
          },
          {
            title: "姓名",
            key: "realname",
            align: "center"
          },
          // {
          //   title: "角色",
          //   key: "",
          //   align: "center"
          // },
          {
            title: "手机号",
            align: "center",
            key: "phone"
          },
          {
            title: "创建时间",
            sortable: true,
            key: "createAt",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center"
          }
        ],
        operates: {
          width: 300,
          fixed: 'right',
          list: [
            {
              id:'1',
              label: '编辑',
              type: 'warning',
              show: true,
              icon: 'el-icon-edit',
              plain: true,
              disabled: false,
              method: (index, row) => {
                this.handleEdit(index, row)
              }
            },
            {
              id:'2',
              label: '删除',
              type: 'danger',
              icon: 'el-icon-delete',
              show: true,
              plain: false,
              disabled: false,
              method: (index, row) => {
                this.handleDel(index, row)
              }
            },
            {
              id:'3',
              label: '启用',
              type: 'danger',
              icon: 'el-icon-delete',
              show: true,
              plain: false,
              disabled: false,
              method: (index, row) => {
                this.handleDel(index, row)
              }
            }
          ]
        }, // 列操作按钮
        data: [],
        isFinish:false,
        selectList: [],
        sort: { asc: [], desc: [] },
        pageSize: 10,
        page: 1,
        total: 0,
        extraParam: {},
        searchItems: [
          {
            name: "账号",
            key: "username",
            type: "string"
          },
          {
            name: "姓名",
            key: "realname",
            type: "string"
          },
          {
            name: "角色",
            key: "",
            type: "select",
            displayValue: [],
            value: []
          },
          {
            name: "创建时间",
            key: "createAt",
            type: "datetimerange"
          },
          {
            name: "状态",
            key: "status",
            type: "select",
            displayValue: ["禁用", "启用"],
            value: ["禁用", "启用"]
          }
        ]
      };
    },
    computed: {
      route() {
        return this.$route;
      }
    },
    components: {
      Search,ITable
    },
    methods: {
      findAllRoles() {
        // post("/api/role/findAll")
      },
      handleChange(date) {
        this.extraParam.loginStartDate = date[0];
        this.extraParam.loginEndDate = date[1];
      },
      handleClear() {
        delete this.extraParam.loginStartDate;
        delete this.extraParam.loginEndDate;
      },
      handleEdit(row) {
        this.$router.push({path:'/manager/create/'+row.id});
      },
      handleDel(index,row) {
        console.log(row);
        post(`api/${this.model}/delete`,{ id : row.id }, res => {
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
        })
      },
      handleStatusChange(row) {
        console.log(row);
        let status;
        let _t = this;
        if (row.status.indexOf('启用') >= 0) {
          status = '禁用'
        } else {
          status = '启用'
        }
        this.$confirm(`确定${status}选中内容？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (status === '禁用') {
            post(`api/${_t.model}/disable`,{ id : row.id },res => {
              _t.$message({
                  type: 'success',
                  message: '已禁用!'
                });
              _t.search(_t.page);
            })
          }else {
            post(`api/${_t.model}/enable`,{ id : row.id },res => {
              _t.$message({
                type: 'success',
                message: '已启用!'
              });
              _t.search(_t.page);
            })
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handlePageSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.search(1);
      },
      handlePageChange(page) {
        this.search(page);
      },
      handleSortChange(sort) {
        let key = sort.key;
        let order = sort.order;
        let asc = this.sort.asc;
        let desc = this.sort.desc;
        if (asc.indexOf(key) > -1) {
          let idx = asc.indexOf(key);
          asc.splice(idx, 1);
        }
        if (desc.indexOf(key) > -1) {
          let idx = desc.indexOf(key);
          desc.splice(idx, 1);
        }
        if (order !== "normal") {
          this.sort[order].push(key);
        }
        this.search(1);
      },
      searchBySearchItem(searchItems) {
        let keys = [];
        for (
          let i = 0,
            searchItemList = this.searchItems,
            len = searchItemList.length;
          i < len;
          i++
        ) {
          keys.push(searchItemList[i].key);
        }
        for (let i in keys) {
          if (searchItems[keys[i]]) {
            this.extraParam[keys[i]] = searchItems[keys[i]];
          } else {
            delete this.extraParam[keys[i]];
          }
        }
        this.search(1);
      },
      toCreate() {
        this.$router.push("/manager/create/0");
      },
      search(page) {
        let _t = this;
        _t.page = page;
        let param = {
          pageable: {
            page: page,
            size: _t.pageSize,
            sort: _t.sort
          },
          [this.model]: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        post(LIST_URL, param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = { [this.model]: _t.extraParam };
        post(COUNT_URL, param, res => {
          _t.total = parseInt(res);
        });
      },
      handleTransportSelectList(list) {
        this.selectList = list;
      },
      //批量删除
      batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$notify.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          this.$confirm('确定删除所选记录吗?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            post(BATCH_DELETE_URL, { ids: ids }, res => {
              _t.search(_t.page);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        });
      },
      //批量启用
      batchEnable(){
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            post(`api/${this.model}/enable`,{ id : s.id },res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //批量禁用
      batchDisable(){
        let _t = this;
        let selectList = this.selectList;
        this.$confirm('确定启用所选的记录吗?', '启用提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          selectList.map(s => {
            post(`api/${this.model}/disable`,{ id : s.id },res => {
              _t.search(_t.page);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSelectionChange(selection){
        this.selectList = selection;
      },
      delete(id) {
        let _t = this;
        post(DELETE_URL, { id: id }, res => {
          _t.search(_t.page);
        });
      },
      enable(id, url) {
        let _t = this;
        post(url, { id: id }, res => {
          _t.search(_t.page);
        });
      }
    },
    mounted() {
      this.search(1);
      // this.findAllRoles();
    }
  };
</script>
<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-button{
    border-radius: 2px;
    padding: 12px 16px;
  }
  .el-button+.el-button{
    margin-left: 2px;
  }
  .el-button--default:hover{
    color: #00a16c;
    border: 1px solid#00a16c;
    background: white;
  }
</style>
