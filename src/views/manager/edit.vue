<template>
  <el-dialog
    title="编辑信息"
    :visible.sync="dialogVisible"
    :modal-append-to-body='false'
    width="30%"
    :before-close="handleClose">

    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="200px">
      <el-form-item label="启用状态" prop="status" label-width="100px">
        <el-radio-group v-model="formValidate.status">
          <el-radio label="启用">启用</el-radio>
          <el-radio label="禁用">禁用</el-radio>
        </el-radio-group>
        <div style="font-size: 12px">* 禁用则该账户不能登录</div>
      </el-form-item>
      <el-form-item label="账号" prop="username" label-width="100px">
        <el-input v-model="formValidate.username" placeholder="输入账号"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password" label-width="100px">
        <el-input type="password" v-model="formValidate.password" placeholder="输入账号"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword" label-width="100px">
        <el-input type="password" v-model="formValidate.confirmPassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realname" label-width="100px">
        <el-input v-model="formValidate.realname" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="fileList" label-width="100px">
        <upload
          @on-transport-file-list="handleTransportFileList"
          :file-list="[formValidate.avatar]"
          :max-size="5120"
          :limit="3"
        >

        </upload>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" label-width="100px">
        <el-input v-model="formValidate.phone" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role" label-width="100px">
        <el-select v-model="formValidate.role" placeholder="选择角色">
          <el-option v-for="item,key in []" :value="item.value" :key="key">{{item.label}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail" label-width="100px">
        <el-input v-model="formValidate.mail" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment" label-width="100px">
        <el-input v-model="formValidate.comment" placeholder="输入备注"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Upload from "@/components/upload";
  import { get } from '@/libs/axios/manager'
  export default {
    name: "edit",
    components:{
      Upload
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },
      editId:{
        type:Number,
        default: 0
      }
    },
    data(){
      const validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("登录密码不能为空"));
        } else {
          if (this.formValidate.password !== "") {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField("confirmPassword");
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("再次输入你的密码"));
        } else if (value !== this.formValidate.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };
      const validateFileList = (rule, value, callback) => {
        if (this.formValidate.fileList.length === 0) {
          callback("头像不能为空");
        } else {
          callback();
        }
      };
      return{
        formValidate:{
          status:'',
          username:'',
          password:'',
          confirmPassword:'',
          realname:'',
          phone:'',
          role:'',
          mail:'',
          comment:''
        },
        ruleValidate: {
          username: [
            {
              required: true,
              message: "账号不能为空",
              trigger: "blur"
            }
          ],
          password: [
            { required: true, validator: validatePass, trigger: "blur" }
          ],
          confirmPassword: [
            { required: true, validator: validatePassCheck, trigger: "blur" }
          ],
          realname: [
            {
              required: true,
              message: "姓名不能为空",
              trigger: "blur"
            }
          ],
          phone: [
            {
              required: true,
              message: "手机号不能为空",
              trigger: "blur"
            }
          ],
          mail: [
            {
              required: true,
              message: "邮箱不能为空",
              trigger: "blur"
            },
            { type: "email", message: "邮箱格式不对", trigger: "blur" }
          ],
          status: [
            { required: true, message: "请选择启用状态", trigger: "change" }
          ],
          role: [{ required: true, message: "请选择角色", trigger: "change" }],
          fileList: [
            { required: true, validator: validateFileList, trigger: "blur" }
          ]
        },
      }
    },
    computed:{
    },
    watch:{
      editId(val){
        this.get(val);
      }
    },
    methods:{
      handleClose(){
        // this.visible = false;
        this.$emit('on-dialog-close');
      },
      handleConfirm(){

      },
      handleTransportFileList(){

      },
      get(id) {
        get({id:id},res => {
            let keys = Object.keys(res);
            keys.map(key => {
              this.formValidate[key] = res[key];
            });

        });
      }
    }
  }
</script>

<style scoped>

</style>
