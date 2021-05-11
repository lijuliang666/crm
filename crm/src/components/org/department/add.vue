<template>
  <div class="my-form">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="my-ruleForm"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="部门描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addDep, getDepInfo, updateDepInfo } from "@/api/index.js";
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {
      ruleForm: {
        name: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写部门描述", trigger: "blur" }]
      }
    };
  },
  created() {
    //  若有id 就是编辑 没有id就是新增
    this.id = this.$route.query.id;
    this.id && this.getInfo(); // 只有在编辑的情况下， 才需要获取数据
  },
  methods: {
    getInfo() {
      // 根据ID去后台拿详细信息
      let id = this.$route.query.id;
      getDepInfo(id).then(data => {
        //console.log(data)
        this.ruleForm.name = data.data.name;
        this.ruleForm.desc = data.data.desc;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.id不存在 才调用新增
          let obj = {
            name: this.ruleForm.name,
            desc: this.ruleForm.desc
          };
          this.id ? (obj.departmentId = this.id) : null;
          (this.id ? updateDepInfo : addDep)(obj).then(data => {
            if (data.code == 0) {
              //console.log(data);
              let str = this.id ? "修改" : "新增";
              this.$alert("恭喜您" + str + "成功", "已完成", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$router.push("/org/departmentList");
                }
              });
            } else {
              this.$alert(str + "失败", "提示", {
                confirmButtonText: "确定",
                callback: action => {}
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      //console.log(formName)
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.my-form {
  box-sizing: border-box;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .my-ruleForm {
    width: 60%;
  }
}
</style>
