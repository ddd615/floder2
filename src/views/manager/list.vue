<template>
  <el-row class="page">
    <el-col :span="24" style="margin: 10px 30px;">
      <el-button icon="md-add" style="margin-right: 10px;" type="primary" @click="toCreate">新建</el-button>
      <el-button icon="md-trash" @click="batchDelete">删除</el-button>
    </el-col>
    <el-col :span="24">
      <search
        style="margin: 10px 30px;"
        :search-items="searchItems"
        @on-search="searchBySearchItem"
      ></search>
    </el-col>
    <el-col :span="24">
      <i-table
        @on-page-change="handlePageChange"
        @on-page-size-change="handlePageSizeChange"
        :total="total"
        :curPage="page"
        :columns="columns"
      ></i-table>
    </el-col>
  </el-row>
</template>
<script>
  import Search from "@/components/search";
  import ITable from "@/components/table";
  // import IModal from "@/components/modal";
  import { post } from "@/libs/http/request";
  const LIST_URL = "/api/manager/search";
  const COUNT_URL = "/api/manager/count";
  const DELETE_URL = "/api/manager/delete";

  const BATCH_DELETE_URL = "/api/manager/delete";
  const ENABLE_URL = "/api/manager/enable";
  const DISABLE_URL = "/api/manager/disable";
  export default {
    data() {
      return {
        model: "manager",
        columns: [
          {
            title: "账号",
            key: "name",
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
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              let status = params.row.status;
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        this.$router.push(
                          `/${this.model}/create/${params.row.id}`
                        );
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "a",
                  {
                    style: {
                      marginRight: "20px"
                    },
                    on: {
                      click: () => {
                        let text = status === "禁用" ? "启用" : "禁用";
                        let url = status === "禁用" ? ENABLE_URL : DISABLE_URL;
                        this.$Modal.confirm({
                          title: `${text}提示`,
                          content: `确定${text}该记录吗?`,
                          okText: "确定",
                          cancelText: "取消",
                          onOk: () => {
                            let id = params.row.id;
                            this.enable(id, url);
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  status === "禁用" ? "启用" : "禁用"
                ),
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除提示",
                          content: `确定该记录吗?`,
                          okText: "确定",
                          cancelText: "取消",
                          onOk: () => {
                            let id = params.row.id;
                            this.delete(id);
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        data: [],
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
      batchDelete() {
        this.broadcast("SiTable", "on-get-selectList");
        this.$nextTick(() => {
          let selectList = this.selectList;
          if (selectList.length === 0) {
            this.$Notice.warning({
              title: "至少选择一条数据"
            });
            return;
          }
          this.$Modal.confirm({
            title: `删除提示`,
            content: `确定删除所选记录吗?`,
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
              post(BATCH_DELETE_URL, { ids: ids }, res => {
                _t.search(_t.page);
              });
            },
            onCancel: () => {}
          });
        });
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
      // this.search(1);
      // this.findAllRoles();
    }
  };
</script>
<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
