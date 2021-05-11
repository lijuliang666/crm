<template>
  <div class="customUploadBox">
    <el-upload
      drag
      action
      accept=".xlsx, .xls"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeFile"
    >
      <!-- action 指服务器的地址 -->
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "CustomUpload",
  data() {
    return {};
  },
  components: {},
  methods: {
    changeFile(ev) {
      console.log(ev);
      let file = ev.raw;
      if (!file) return;
        // FileReader 操作的是文件 一般都会用它（我们可以把上传的图片 解析为BASE64格式IDE，也可以把文件解析为 ArrayBuffer 或者 二进制格式 的） 他是异步的
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = ev => {
        console.log(ev.target.result);
      };
      // 1.获取上传的文件

      // 2.把文件中的数据解析为JSON格式数据

      // 3.把数据逐一上传到服务器端

      // 4.上传成功和上传失败的时候做一些处理
    }
  }
};
</script>

<style lang="less">
.customUploadBox {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 83vh;
}
</style>