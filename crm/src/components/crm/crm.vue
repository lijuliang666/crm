<template>
  <div class="crmBox">
    <div class="menu">
      <el-button
        @click="drawer = true"
        type="primary"
        style="margin-left: 10px;margin-top:10px"
        icon="el-icon-setting"
        circle
      ></el-button>

      <el-drawer
        class="crmAsid"
        :withHeader="false"
        :show-close="false"
        :visible.sync="drawer"
        direction="ltr"
      >
        <el-link type="info" @click="returnBack">返回</el-link>
        <el-menu :router="true" default-active="/crm/list">
          <el-menu-item index="/crm/list">
            <i class="el-icon-document"></i>
            <span slot="title">客户列表</span>
          </el-menu-item>
          <el-menu-item index="/crm/create">
            <i class="el-icon-circle-plus-outline"></i>
            <span slot="title">新增客户</span>
          </el-menu-item>
          <el-menu-item index="/crm/upload">
            <i class="el-icon-upload"></i>
            <span slot="title">批量上传</span>
          </el-menu-item>
        </el-menu>
      </el-drawer>
    </div>
    <keep-alive include="CustomList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    returnBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less">
.crmBox{
  background-color: #fff;
}
.crmAsid {
  position: absolute;
  top: 60px;
  bottom: 60px;
}
.v-modal {
  top: 60px;
  bottom: 60px;
  height: 593px;
}
.menu {
  .el-menu {
    border-right: none !important;
  }

  .el-drawer {
    width: 180px !important;
  }

  .el-button {
    font-size: 24px !important;
    width: 40px !important;
    height: 40px !important;
    padding: 0 !important;
    position: fixed;
  }

  .el-link {
    padding: 0 20px;
    line-height: 40px !important;
  }
}
</style>