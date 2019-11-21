<template>
  <el-row class="page">
    <el-col offset="1" span="12" style="margin-top: 20px;">
      <h3>基本信息</h3>
    </el-col>
    <el-col offset="1" span="12" style="margin-top: 20px;">
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
<!--          <upload-->
<!--            @on-transport-file-list="handleTransportFileList"-->
<!--            :list="[this.formValidate.avatar]"-->
<!--            prefix="http://demo1.wanjuanlink.com/attachment/"-->
<!--            action="/api/attachment/upload"-->
<!--            :uploadStyles="{width: '40px', height: '40px', lineHeight: '40px'}"-->
<!--            :picStyles="{width: '200px', height: '120px', lineHeight: '120px' }"-->
<!--          />-->
          <upload>

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

        <el-form-item label-width="100px">
          <el-button type="primary" @click="handleSubmit('formValidate')">提交</el-button>
          <el-button @click="handleReset('formValidate')" style="margin-left: 8px">返回上一页</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
  import Upload from "@/components/upload";
  import Emitter from "@/mixins/emitter";
  import { post } from "@/libs/http/request";
  const GET_URL = "/api/manager/get";
  const UPDATE_URL = "/api/manager/update";
  export default {
    mixins: [Emitter],
    data() {
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
      return {
        formValidate: {
          username: "",
          address: "",
          comment: "",
          status: "1",
          password: "",
          confirmPassword: "",
          course: "",
          realname: "",
          avatar: "",
          fileList: [],
          phone: "",
          birth: "",
          sex: "",
          mail: ""
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
        }
      };
    },
    components: {
      Upload
    },
    methods: {
      handleSubmit(realname) {
        this.broadcast("SiUpload", "on-form-submit", () => {});
        this.$nextTick(() => {
          this.$refs[realname].validate(valid => {
            if (valid) {
            }
          });
        });
      },
      handleReset(realname) {
        //   this.$refs[realname].resetFields();
        this.$router.go(-1);
      },
      handleTransportFileList(fileList) {
        this.formValidate.fileList = fileList;
      },
      get(id) {
        post(GET_URL, { id }, res => {
          let keys = Object.keys(res);
          keys.map(key => {
            this.formValidate[key] = res[key];
          });
        });
      }
    },
    mounted() {
      let id = this.$route.params.id;
      if (parseInt(id) !== 0) {
        this.get(id);
      }
    }
  };
</script>
<style lang="less" scoped>
  .page {
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
