<template>
    <div class="upload" v-if="type === 'img'">
      <el-upload
        ref="upload"
        action="api/attachment/upload"
        list-type="picture-card"
        :file-list="defaultList"
        :limit="limit"

        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :beforeUpload="onBeforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible"  :modal-append-to-body='false'>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

    </div>
</template>

<script>
export default {
  name: "SiUpload",
  props:{
    type: {
      type: String,
      default: 'img'
    },
    fileList: {
      type: Array,
      default: []
    },
    limit: {
      type: Number,
      default: 1
    },
    //上传大小,单位为kb
    maxSize: {
      type: Number,
      default: 1024
    },
    accept: {
      type: String,
      default: 'jpg/png/git/jpeg'
    },
    perfix: {
      type: String,
      default: 'https://www.gunghobox.com/images/'
    }
  },
  data(){
     return{
       dialogImageUrl: '',
       dialogVisible: false,
       defaultList:[]
     }
  },
  created(){
    if (this.fileList.length > 0) {
      console.log(this.fileList)
      this.fileList.map((s,i) => {
        console.log('s',s);
        let obj = {
          name: i,
          url:this.perfix + s,
          response:{
            data:s
          }
        }
        this.defaultList.push(obj);
      })
    }
    this.$on("on-form-submit", () => {
      this.$emit("on-transport-file-list", this.defaultList);
    });
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      // this.defaultList = fileList;
      let index = fileList.findIndex(s=>{
        console.log(s.uid);
        console.log(file.uid);
        return s.uid === file.uid;
      });
      console.log(index);
      this.defaultList.splice(index,1);

    },
    handleSuccess(res,file,fileList) {
      console.log(res);
      console.log(file);
      console.log(fileList);
      this.defaultList.push(file);
      console.log(this.defaultList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(file,fileList) {
      console.log(file,fileList);
      this.$notify({
        title: '警告',
        message: `最多只能上传${this.limit}张图片`,
        type: 'warning'
      });
    },
    onBeforeUpload(file) {
      const suffix = file.name.substring(file.name.lastIndexOf('.')+1)
      const isLt2M = file.size / 1024  <  this.maxSize;
      const isLtType = this.accept.indexOf(suffix) >= 0
      if (!isLtType) {
        this.$message({
          message: `上传文件格式必须为${this.accept}`,
          type: 'warning'
        });
      }
      if(!isLt2M) {
        this.$message({
          message: `上传文件大小不能超过${this.maxSize}KB!`,
          type: 'warning'
        });
      }
      console.log(this.accept.indexOf('suffix') === -1);
      console.log(isLt2M)
      return isLt2M && isLtType;
    }
  }

}
</script>

<style scoped>
  .upload /deep/ .el-upload-list__item{
    width: 100px;
    height: 100px;
  }
  .upload /deep/ .el-upload--picture-card{
    width: 100px;
    height: 100px;
    line-height: 106px;
  }
</style>
