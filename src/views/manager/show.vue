<template>
    <div >
      <div style="margin-top: 20px;display: flex">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-dropdown style="position: absolute;right: 0;top: -7px"  @command="handleClick">
              <el-button type="text" icon="el-icon-more"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="编辑">编辑</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text item">
            <span class="text_label">账号：</span>
            {{manager.username}}
          </div>
          <div class="text item">
            <span class="text_label">手机号：</span>
            {{manager.phone}}
          </div>
          <div class="text item">
            <span class="text_label">姓名：</span>
            {{manager.realname}}
          </div>
          <div class="text item">
            <span class="text_label">头像：</span>
            <el-image
              style="width: 100px; height: 100px"
              :src="'https://www.gunghobox.com/images/'+manager.avatar"
              :preview-src-list="['https://www.gunghobox.com/images/'+manager.avatar]">
            </el-image>
          </div>
          <div class="text item">
            <span class="text_label">状态：</span>
            {{manager.status}}
          </div>
          <div class="text item">
            <span class="text_label">备注：</span>
            {{manager.comment}}
          </div>
        </el-card>
        <el-card class="box-card-large">
          <el-tabs v-model="activeName">
            <el-tab-pane label="角色管理" name="first">
              <el-col :span="24">
                <el-table
                  :data="roleList"
                  style="width: 90%;margin-left: 30px"
                  @selection-change="handleSelectionChange"
                  @row-click="handleRowClick"
                >
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="角色名称"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    label="角色类型"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="comment"
                    label="角色备注"
                  >
                  </el-table-column>
                </el-table>
                <div class="footor" >
                  <div class="pager-group">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="page"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                  </div>
                </div>
              </el-col>
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </div>
      <i-edit
        :dialog-visible="editProps.visible"
        :edit-id="editId"
        @on-dialog-close="handleClose"
      ></i-edit>
    </div>
</template>

<script>
  import { get } from '@/libs/axios/manager'
  import { search,count } from '@/libs/axios/role'
  import IEdit from './edit'
    export default {
        name: "show",
      components:{
        IEdit
      },
      data() {
          return{
            manager:{},
            editProps:{
              visible:false
            },
            id:this.$route.params.id,
            editId:0,
            activeName: 'first',
            page:1,
            pageSize:10,
            sort:{desc:['id']},
            roleList:[],
            total:0
          }
      },
      created(){
        this.get();
        this.roleSearch();
      },
      methods:{
          get(){
            get({id:this.id},res => {
               this.manager = res;
            });
          },
          roleSearch(){
            let param = {
              pageable:{
                page: this.page,
                pageSize: this.pageSize,
                sort: this.sort
              }
            };

            search(param,res => {
              this.roleList = res;
              this.roleCount();
            });

          },
          roleCount(){
            count({},res => {
              this.total = res;
            })
          },
        handleSelectionChange(){

        },
        handleRowClick(){

        },
        handleSizeChange(val){
            this.pageSize = val;
            this.roleSearch();
        },
        handleCurrentChange(val){
            this.page = val;
            this.roleSearch();
        },
        handleClose(){
          this.editProps.visible = false;
        },
        handleClick(command) {
          switch (command) {
            case '编辑':
              this.editId = this.id;
              this.editProps.visible = true;
              break;
          }
        }
      }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .text_label{
    display: inline-block;
    width: 100px;
    text-align: right;
  }
  .clearfix{
    position: relative;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 350px;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 800px;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
</style>
