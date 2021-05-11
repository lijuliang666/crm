<template>
  <div class="my-table">
    <el-table :data="tableData" height="593" border style="width: 100%" stripe>
      <el-table-column type="index" label="编号" width="180" align="center"></el-table-column>
      <el-table-column prop="name" label="部门" width="180" align="center"></el-table-column>
      <el-table-column prop="desc" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDepList, delDepInfo } from "../../../api/index";
export default {
  name: "departmentList",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    getDepList().then(data => {
      //console.log(data);
      this.tableData = data.data;
    });
  },
  methods: {
    handleEdit(index, row) {
      //console.log(index, row);
      getDepList().then(data => {
        this.$router.push({
          path: "/org/departmentAdd",
          query: { id: row.id }
        });
      });
    },
    handleDelete(index, row) {
      //console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDepInfo(row.id).then(data => {
            //console.log(data)
            this.tableData.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less">
</style>