<template>
  <div>
    <el-container>
      <el-header class="my-header">
        <h1>CRM 管理系统</h1>
        <div class="middle">
          <router-link to="/org">组织结构</router-link>
          <router-link to="/crm">客户管理</router-link>
        </div>
        <div class="right">
          欢迎您：{{userName}}
          <span @click="logout">安全退出</span>
        </div>
      </el-header>
      <router-view></router-view>
      
      <el-footer class="my-footer">Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
import {logout} from "../api/index";
import { SETUSERINFO } from "../store/types";
export default {
  name: "XXX",
  data() {
    return {};
  },
  computed: {
    userName() {
      return this.$store.state.userInfo.userName;
    }
  },
  methods: {
    logout() {
      //退出接口
      logout().then(data => {
        // 删除VUEX的状态信息
         this.$store.commit(SETUSERINFO, {}),
          // 清空localStorage
          localStorage.removeItem("crmUserInfo"),
          // 页面跳转
          this.$router.push("/login");
      });
    }
  },
};
</script>
<style lang="less">
.el-container {
  .my-header {
    display: flex;
    //justify-content: space-between;
    //background-color: #333;
    width: 100%;
    //color: #fff;
    h1 {
      width: 200px;
      margin: 0px;
      line-height: 60px;
    }
    .middle {
      flex: auto;
      text-align: left;
      box-sizing: border-box;
      padding-left: 50px;
      a {
        color: #fff;
        text-decoration: none;
        padding-right: 30px;
      }
      a.router-link-active {
        color: red;
        font-weight: bolder;
      }
    }
    .right {
      width: 200px;
      float: right;
    }
  }
  .my-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}

.el-header,
.el-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>