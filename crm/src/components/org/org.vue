<template>
  <div>
    <el-container class="container">
      <el-aside width="200px" class="left">
        <el-col :span="24" class="innerBox">
          <el-menu
            default-active="2"
            class="my-menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
          >
            <el-submenu index="1" v-if="power.indexOf('departhandle') !== -1">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>部门管理</span>
              </template>

              <router-link to="/org/departmentList">
                <el-menu-item index="1-1">部门列表</el-menu-item>
              </router-link>

              <router-link to="/org/departmentAdd">
                <el-menu-item index="1-2">新增部门</el-menu-item>
              </router-link>
            </el-submenu>

            <el-submenu index="2" v-if="power.indexOf('jobhandle') !== -1">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>职务管理</span>
              </template>
              <router-link to="/org/jobList">
                <el-menu-item index="2-1">职务列表</el-menu-item>
              </router-link>
              <router-link to="/org/jobAdd">
                <el-menu-item index="2-2">新增职务</el-menu-item>
              </router-link>
            </el-submenu>

            <el-submenu index="3" v-if="power.indexOf('userhandle') !== -1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>员工管理</span>
              </template>
              <router-link to="/org/userList">
                <el-menu-item index="3-1">员工列表</el-menu-item>
              </router-link>
              <router-link to="/org/userAdd">
                <el-menu-item index="3-2">新增员工</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {};
  },
  methods: {
    //change
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    }
  },
  computed: {
    power() {
      return this.$store.state.userInfo.power.split("|");
    }
  },

  components: {}
};
</script>
<style lang="less">
.container {
  position: absolute;
  top: 60px;
  bottom: 60px;
  width: 100%;

  .left {
    background-color: #545c64;
    overflow: hidden;
    .innerBox {
      width: 110%;
      height: 100%;
      overflow-y: scroll;
    }
  }
  .my-menu {
    .el-submenu__title {
      color: #fff;
    }
    .el-menu-item {
      color: #fff;
    }

    .router-link-active {
      .el-menu-item {
        color: #ffd04b;
      }
    }

    a {
      text-decoration: none;
    }
  }
  .my-main {
    width: 100%;
    padding: 0px;
    background-color: #fff;
  }
  .el-main {
    line-height: 0px;
    text-align: left;
  }
}
</style>