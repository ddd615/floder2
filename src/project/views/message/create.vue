<template>
  <el-dialog
    title="基本信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="60%"
    :before-close="handleClose">

    <el-steps :active="active"  align-center>
      <el-step title="消息内容">
      </el-step>
      <el-step title="推送对象"></el-step>
      <el-step title="推送时间"></el-step>
    </el-steps>

    <div style="overflow: auto;height:40vh;padding: 10px 0 40px;">
      <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="150px" v-if="active === 0">
        <el-form-item label="消息标题" prop="title">
          <el-input v-model="formValidate.title" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subTitle" >
          <el-input v-model="formValidate.subTitle" placeholder="输入副标题"></el-input>
        </el-form-item>
        <el-form-item label="图文详情" prop="content">
          <Editor :defaultContent="formValidate.content" @on-change-content="onChangeEditor"/>
        </el-form-item>
      </el-form>
      <el-form label-width="150px">
        <el-form-item label="推送对象" prop="scope" v-if="active === 1">
          <el-radio-group v-model="formValidate.scope">
            <el-radio label="全部用户">全部对象</el-radio>
            <el-radio label="指定用户">指定对象</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-row class="page" v-if="formValidate.scope === '指定用户' && active === 1">
        <!--    搜索-->
        <el-col :span="24">
          <search
            style="width: 95%;margin: 10px auto"
            :search-items="searchItems"
            @on-search="searchBySearchItem"
          ></search>
        </el-col>
        <!--    按钮和分页-->
        <el-col :span="24">
          <div style="width: 95%;margin: 10px auto;">
            <div class="pager-group">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, jumper, prev, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </el-col>
        <!--    表格-->
        <el-col :span="24">
          <el-table
            :data="data"
            style="width: 95%;margin:0 auto;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="User ID"
            >
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="昵称"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
            >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">

      <el-button type="info" @click="pre" v-if="active>0">上一步</el-button>
      <el-button type="info" @click="next" v-if="active<2">下一步</el-button>
      <el-button type="primary" @click="handleConfirm" v-if="active === 2">确 定</el-button>
    </div>

  </el-dialog>
</template>

<script>
  import Editor from "@/framework/components/editor"
  import Upload from "@/framework/components/upload";
  import Search from "@/framework/components/search";
  import { save } from '@/project/libs/axios/role';
  import { search,count } from "@/project/libs/axios/user"
  export default {
    name: "dialog",
    components:{
      Upload,Editor,Search
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      messageType:{
        type:String,
        default:'短信推送'
      }
    },
    directives:{
      required: {
        inserted: function (el) {
          console.log(el.children)
          el.children[0].addEventListener('blur', function (event) {
            if (el.value == '' || el.value == null) {
              el.children[0].style.border = "1px solid red";
              console.log('我不能为空');
            }
            ;
          });
        }
      }
    },

    data(){
      return{
        formValidate:{
          title:'',
          content:'',
          scope:'',
          type:this.messageType,
          createAt: "2019-11-30 17:15:39"
        },
        ruleValidate:{
          title:[{required:true,message:'不能为空',trigger:'blur'}],
          subtitle:[{required:true,message:'不能为空',trigger:'blur'}],
        },
        model:'user',
        active: 0,
        data:[],
        page:1,
        pageSize:10,
        total:0,
        sort: {asc: [], desc: ['id']},
        extraParam:{},
        searchItems: [
          {
            name: "手机号",
            key: "phone",
            type: "string"
          },
          {
            name: "最近登录时间",
            key: "accessAt",
            type: "daterange",
          },
          {
            name: "状态",
            key: "status",
            type: "select",
            displayValue: ["禁用", "启用"],
            value: ["禁用", "启用"]
          }
        ]
      }
    },
    computed:{
    },
    created(){

    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(){
        let userList = [];
        this.formValidate.type = this.messageType,
        save({
          message:this.formValidate,
          userIdList:userList
        },res => {
          this.$notify.success('添加成功');
          this.$emit('on-save-success');
        })
      },
      handleTransportFileList(){

      },
      pre() {
        if (this.active-- < 0) this.active = 0;
      },
      next() {
        this.search(this.page);
        if (this.active++ > 2) this.active = 0;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.search(this.page);
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;

        this.search(this.page);
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
          user: _t.extraParam
        };
        if (
          param.pageable.sort.asc.length === 0 &&
          param.pageable.sort.desc.length === 0
        ) {
          delete param.pageable.sort;
        }
        search(param, res => {
          let data = res;
          _t.data = data;
          _t.getTotal();
        });
      },
      getTotal() {
        let _t = this;
        let param = {user: _t.extraParam};
        count(param, res => {
          _t.total = parseInt(res);
        });
      },
      handleSelectionChange(){

      },
      searchBySearchItem(){

      },
      onChangeEditor(val){

        this.formValidate.contet = val.html;
      }
    }
  }
</script>

<style scoped>

</style>
