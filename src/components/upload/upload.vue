<template>
    <div v-if="type === 'img'">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :file-list="fileList"
        :limit="limit"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

    </div>
</template>

<script>
export default {
  name: "upload",
  props:{
    type: {
      type: String,
      default: 'img'
    },
    action: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: []
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data(){
     return{
       dialogImageUrl: '',
       dialogVisible: false,

     }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(file,fileList) {
      console.log(file,fileList);
    }
  }

}
</script>

<style scoped>

</style>
