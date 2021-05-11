<template>
  <div class="customListBox">
    <!-- 搜索区域 -->
    <div class="searchBox">
      <el-input v-model="searchText" placeholder="请输入内容"></el-input>
      <el-select v-model="type" placeholder="请选择">
        <el-option label="全部客户" value></el-option>
        <el-option label="重点客户" value="重点客户"></el-option>
        <el-option label="一般客户" value="一般客户"></el-option>
        <el-option label="放弃客户" value="放弃客户"></el-option>
      </el-select>
      <el-button type="primary" @click="searchHandle">搜索</el-button>
      <el-button type="success" >导出EXCEL</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table
      :data="tableList"
      height="66vh"
      stripe
      border
      size="small"
      ref="table"
      v-loading="loading"
      element-loading-text="小主，奴家正在努力加载中"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" align="center" :formatter="formatterSex"></el-table-column>
      <el-table-column prop="phone" label="电话" align="center"></el-table-column>
      <el-table-column prop="weixin" label="微信" align="center"></el-table-column>
      <el-table-column prop="type" label="类别" align="center"></el-table-column>
      <el-table-column prop="userName" label="业务员" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="text">查看</el-button>
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text" @click="goToVisit(scope)">回访</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <div class="pageBox">
      <el-pagination
        v-if="tableList.length"
        background
        layout="total, prev, pager, next"
        :small="true"
        :total="total"
        :page-size.sync="limit"
        :current-page.sync="page"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "CustomList",
  data() {
    return {
      searchText: "",
      type: "",
      tableList: [],
      multipleSelection: [],
      // 分页
      limit: 15,
      total: 0,
      page: 1
    };
  },
  created() {
    this.queryData();
    console.log(this.$api.custom);
    
  },
  methods: {
    // 性别的格式化
    formatterSex(row, column, cellValue) {
      return row.sex === 0 ? "男" : "女";
    },
    // 选择多个数据
    selectionChange(val) {
      // val 存储的是选中的值
      this.multipleSelection = val;
    },
    // 跳转到回访详情
    goToVisit(scope) {
      this.$router.push(`/crm/visit/${scope.row.id}`);
    },
    // 分页处理
    changePage(num) {
        this.page = num;
        this.queryData();
    },
    // 获取数据
    async queryData() {
      this.loading = true;
      let { limit, page, searchText: search, type } = this;
      let result = await this.$api.custom.queryCustomList({
        limit,
        page,
        type,
        search
      });
      //不管是否有数据都要清空
      this.multipleSelection = [];
      if (result.code != 0) {
        this.tableList = [];
        return;
      }
      this.tableList = result.data;
      // 利用+号，把字符串转化为数字
      this.total = +result.total;
      this.page = +result.page;
      this.limit = +result.limit;
      // 默认是没有加载的
      this.loading = false;
    },
    // 搜索操作
    searchHandle() {
      this.page = 1;
      this.queryData();
    },
  }
};
</script>
<style lang="less">
.searchBox {
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  padding: 10px 60px;
  height: 9vh;

  .el-input,
  .el-select,
  .el-button {
    margin-right: 10px;
    margin-left: 0px !important;
  }

  .el-input {
    width: 30% !important;
  }

  .el-select {
    width: 20% !important;
    .el-input {
      width: 100% !important;
    }
  }
}

.pageBox {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
  height: 10vh;
}
</style>