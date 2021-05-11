<template>
  <div class="userList">
    <div class="userListTop">
      <el-select v-model="value" placeholder="请选择部门" class="userTop-select">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          <!-- label是用来展示的文案 value是文案对应的值 -->
        </el-option>
      </el-select>
      <el-input
        class="userTop-input"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2"
      ></el-input>
    </div>

    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        height="493"
        border
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="www">{{www.row.sex=="0"?"男":"女"}}</template>
        </el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <el-table-column prop="job" label="职务" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="desc" label="描述" align="center"></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getDepList, getUserList } from "@/api/index.js";
// @ is an alias to /src
export default {
  name: "XXX",
  data() {
    return {
      value: "",
      input2: "",
      options: [],
      // options 中的数据是从后台获取的，不能修改，所以不需要劫持，为了节省性能我们利用Object.freeze（）冻结数据（取消劫持）
      multipleSelection: [],
      tableData: []
    };
  },
  created() {
    getDepList().then(data => {
      console.log(data);
      let ary = data.data || [];
      ary.unshift({
          id:0,
          name:'全部'
      });
      ary = ary.map(item => Object.freeze(item)); // 是用来冻结对象的，可以用来性能优化（浅层次冻结）
      this.options = ary;
    });
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getList(options) {
      getUserList(options).then(data => {
        //console.log(data);
        this.tableData = data.data;
      });
    }
  },
  watch: {
    value(val) {
      console.log(val);
      this.getList({
        departmentId: val,
        search: this.input2
      });
    }
  }
};
</script>
<style lang="less">
.userList {
  padding: 20px;
  .userListTop {
    float: right;
    margin-bottom: 20px;
    .userTop-input {
      width: 250px;
      margin-left: 20px;
    }
  }
}
</style>