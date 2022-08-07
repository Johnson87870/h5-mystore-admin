<template>
  <div class="admin-list-container">
    <div class="search">
      <el-input v-model="input" placeholder="输入管理员ID、昵称"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="adminId" label="id" width="150">
      </el-table-column>
      <el-table-column prop="adminName" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="adminPassword" label="密码" width="150">
      </el-table-column>
      <el-table-column prop="adminPhone" label="联系方式" width="300">
      </el-table-column>
      <el-table-column prop="adminLevel" label="级别" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="success" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <el-dialog title="管理员信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.adminId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.adminPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.adminPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="级别" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.adminLevel" autocomplete="off"></el-input> -->
          <el-select v-model="form.adminLevel" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="update"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { list, searchAdmin, deleteAdmin, updateAdmin } from "@/api/user";
export default {
  activated() {
    // const { adminId, adminPassword, adminName, adminPhone, adminLevel } =
    //   JSON.parse(window.localStorage.getItem("adminInfo"));
    const data = {
      pageNum: this.currentPage,
      pageSize: this.pageSized,
    };
    list(data).then((res) => {
      const { total, list } = res.data;
      this.total = total;
      this.tableData = list;
    });
  },

  data() {
    return {
      input: "",
      tableData: [],
      total: 100,
      pageSized: 10,
      currentPage: 1,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      loading: false,
      options: [
        {
          value: "0",
          label: "普通管理员",
        },
        {
          value: "1",
          label: "超级管理员",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log("search", this.input);
      searchAdmin(this.input).then((res) => {
        console.log("res", res);
      });
    },
    handleCurrentChange(e) {
      console.log("handleCurrentChange , e", e);
      this.currentPage = e;
    },
    handleEdit(data) {
      console.log("handleEdit edit", data);
      this.form = JSON.parse(JSON.stringify(data));
      this.dialogFormVisible = true;
    },
    handleDelete(data) {
      deleteAdmin(data.adminId).then((res) => {
        console.log("删除成功");
        getList();
      });
    },
    update() {
      // this.dialogFormVisible = false;
      this.loading = true;
      updateAdmin(this.form)
        .then((res) => {
          console.log("修改管理员信息成功");
          this.loading = false;
          this.getList();
          this.dialogFormVisible = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getList() {
      const data = {
        pageNum: this.currentPage,
        pageSize: this.pageSized,
      };
      console.log("data", data);
      list(data).then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-list {
  &-container {
    margin: 30px;
    white-space: nowrap;
    .search {
      width: 300px;
      margin-bottom: 30px;
      button {
        margin: 10px;
      }
    }
  }
}
</style>
