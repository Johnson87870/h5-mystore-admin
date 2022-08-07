<template>
  <div class="buyer-list-container">
    <div class="search">
      <el-input v-model="input" placeholder="输入管理员ID、昵称"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="buyerId" label="id" width="150">
      </el-table-column>
      <el-table-column prop="buyerName" label="昵称" width="120">
      </el-table-column>
      <el-table-column prop="buyerPassword" label="密码" width="150">
      </el-table-column>
      <el-table-column prop="buyerPhone" label="联系方式" width="300">
      </el-table-column>
      <el-table-column prop="buyerAddress" label="地址" width="200">
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
      :current-page="curretPage"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { blackList } from "@/api/storeUser";
export default {
  mounted() {
    const data = {
      pageNum: 1,
      pageSize: 10,
    };
    console.log("data", data);
    blackList(data).then((res) => {
      console.log("res", res);
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
      curretPage: 1,
      pageSized: 10,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log("search", this.input);
      // searchUser(this.input).then((res) => {
      //   this.tableData = res.data;
      // });
    },
    handleCurrentChange(e) {
      console.log("handleCurrentChange , e", e);
      this.curretPage = e;
    },
    handleEdit(data) {
      console.log("handleEdit edit", data);
    },
    handleDelete(data) {
      console.log("handleDelete delete", data);
      // deleteUser(data.buyerId).then((res) => {
      //   this.tableData = [res.data];
      // });
    },
    getList() {
      const data = {
        pageNum: this.currentPage,
        pageSize: this.pageSized,
      };
      console.log("data", data);
      blackList(data).then((res) => {
        console.log("res", res);
        const { total, list } = res.data;
        this.total = total;
        this.tableData = list;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.buyer-list {
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
