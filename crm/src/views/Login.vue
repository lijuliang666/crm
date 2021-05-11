<template>
  <div class="loginBox">
    <h1>金色小芝麻登录页</h1>
    <el-input prefix-icon="el-icon-user-solid" v-model="name" placeholder="请输入账号"></el-input>
    <el-input prefix-icon="el-icon-tickets" placeholder="请输入密码" v-model="psw" show-password></el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>
<script>
// @ is an alias to /src
import { login } from "../api/index.js";
//import userInfo from "../store/state.js";
import {SETUSERINFO} from "../store/types";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      psw: ""
    };
  },
  methods: {
    login() {
      login({
        account: this.name,
        password: this.psw
      }).then(data => {
        //校验账号密码是否正确
        if (data.code == 0) {
          // 存入VUEX
          this.$store.commit(SETUSERINFO, {
            userName:this.name,
            // 存储用户权限
            power: data.power
          })
          console.log(this.$store.state)
          // 存入localStorage中
          localStorage.setItem('crmUserInfo',JSON.stringify({
            userName: this.name,
            // 存储用户权限
            power: data.power
          }))
          //成功弹框
          this.$alert("恭喜您登录成功", "验证成功", {
            confirmButtonText: "确定",
            // 点击确认，路由跳转；
            callback: action => {
              this.$router.push('/')
            }
          });
        } else {
          (this.name = ""), (this.psw = "");
        }
      });
    }
  }
};
</script>
<style lang="less">
.loginBox {
  margin: 100px auto;
  width: 500px;
  //height: 500px;
  padding-bottom: 30px;
  background-color: #fff;
  h1 {
    text-align: center;
    padding-top: 30px;
  }
  .el-input {
    width: 60%;
    margin: 30px auto 0;
    display: block;
  }
  button {
    display: block;
    margin: 30px auto 0;
  }
}
</style>