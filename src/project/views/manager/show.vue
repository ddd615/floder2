<template>
    <div >
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-dropdown style="position: absolute;right: -9px;top: -6px"  @command="handleClick">
              <el-button type="text">
                <img src="../../assets/more.png" alt="" width="10" height="8">
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                <el-dropdown-item command="状态">{{manager.status === '启用' ? '禁用':'启用'}}</el-dropdown-item>
                <el-dropdown-item command="修改密码">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text item" style="display: flex;align-items: center">
            <span class="text_label">头像：</span>
            <el-image
              style="width: 50px; height: 50px;border-radius: 40px;"
              :src="'https://www.gunghobox.com/images/'+manager.avatar"
              @click="imgVisible = true">
            </el-image>
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
            <span class="text_label">状态：</span>
            {{manager.status}}
          </div>
          <div class="text item">
            <span class="text_label">备注：</span>
            {{manager.comment}}
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card-large">
          <el-tabs v-model="activeName">
            <el-tab-pane label="角色设置" name="first">
              <el-col :span="24">
                <div class="table-button">
                  <el-button size="mini" type="info" icon="el-icon-refresh" @click="reload"></el-button>
                  <div class="pager-group">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="page"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="pageSize"
                      layout="total, sizes,jumper,prev,next"
                      :total="total">
                    </el-pagination>
                  </div>
                </div>

                <el-table
                  :data="roleList"
                  style="width: 100%"
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
                    prop="comment"
                    label="角色备注"
                  >
                  </el-table-column>
                </el-table>

              </el-col>
            </el-tab-pane>

          </el-tabs>
        </el-card>
      </el-col>


      <i-edit
        :dialog-visible="editProps.visible"
        :edit-id="editId"
        @on-dialog-close="handleClose"
      ></i-edit>
<!--      <el-dialog-->
<!--        title="查看图片"-->
<!--        :visible.sync="imgVisible"-->
<!--        :modal-append-to-body='false'-->
<!--        width="50%"-->
<!--        :before-close="handleClose">-->
<!--        <img :src="'https://www.gunghobox.com/images/'+manager.avatar" alt="" width="100%">-->
<!--      </el-dialog>-->
      <preview-img :img-visible="imgVisible" :img-url="manager.avatar" @on-preview-cancal="handleClose">

      </preview-img>
      <el-dialog
        title="修改密码"
        :visible.sync="sercetVisible"
        :modal-append-to-body='false'
        :append-to-body="true"
        width="50%"
        :before-close="handleClose">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirm('ruleForm')">确 定</el-button>
          <el-button type="info" @click="handleClose">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import {get, enable, disable} from '@/project/service/manager'
  import {search, count} from '@/project/service/role'
  import previewImg from '@/framework/components/previewImg/previewImg.vue'
  import IEdit from './edit'

  export default {
    name: "show",
    components: {
      IEdit, previewImg
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        manager: {},
        editProps: {
          visible: false
        },
        imgVisible: false,
        sercetVisible: false,
        id: this.$route.params.id,
        editId: 0,
        activeName: 'first',
        page: 1,
        pageSize: 10,
        sort: {desc: ['id']},
        roleList: [],
        total: 0,
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        },
        ruleForm: {
          pass: '',
          checkPass: '',
        },
      }
    },
    created() {
      this.get();
      this.roleSearch();
    },
    methods: {
      get() {
        get({id: this.id}, res => {
          this.manager = res;
        });
      },
      roleSearch() {
        let param = {
          pageable: {
            page: this.page,
            size: this.pageSize,
            sort: this.sort
          },
          role:{

          }
        };

        search(param, res => {
          this.roleList = res;
          this.roleCount();
        });

      },
      roleCount() {
        count({role:{}}, res => {
          this.total = res;
        })
      },
      handleSelectionChange() {

      },
      handleRowClick() {

      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.roleSearch();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.roleSearch();
      },
      handleClose() {
        this.editProps.visible = false;
        this.imgVisible = false;
        this.sercetVisible = false;
      },
      handleClick(command) {
        switch (command) {
          case '编辑':
            this.editId = this.id;
            this.editProps.visible = true;
            break;
          case '修改密码':
            this.sercetVisible = true;
            break;
          case '状态':
            let status = this.manager.status;
            if (status === '禁用') {
              enable({id: this.id}, res => {
                this.$message({
                  type: 'success',
                  message: '已启用!'
                });
                this.get();
              })
            } else {
              disable({id: this.id}, res => {
                this.$message({
                  type: 'success',
                  message: '已禁用!'
                });
                this.get();
              })
            }
            break;
        }
      },
      handleConfirm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reload() {
        this.roleSearch();
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
    width: 92%;
    margin: 20px;
    display: inline-block;
  }
  .box-card-large{
    width: 92%;
    display: inline-block;
    margin: 20px;
  }
  .el-button--text{
    color: #3e5265;
  }
  .el-button--mini{
    padding: 4px 12px;
  }
  .table-button{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
</style>
