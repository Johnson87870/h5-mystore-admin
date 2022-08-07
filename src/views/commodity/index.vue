<template>
  <div class="goods-list-container">
    <div class="search">
      <el-input v-model="input" placeholder="输入商品ID"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="goodsId" label="商品ID" width="100">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="goodsNumber" label="商品数量" width="100">
      </el-table-column>
      <el-table-column prop="goodsPrice" label="商品价格" width="100">
      </el-table-column>
      <el-table-column label="商品状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.goodsStatus | goodsStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="goodsDetails" label="商品详情" width="150">
      </el-table-column>
      <el-table-column prop="goodsAddress" label="商品地址" width="150">
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
      :current-page="currentPage"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品ID" :label-width="formLabelWidth">
          <el-input v-model="form.goodsId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" :label-width="formLabelWidth">
          <el-input v-model="form.goodsNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.goodsPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.goodsStatus" autocomplete="off"></el-input> -->
          <el-select v-model="form.goodsStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品地址" :label-width="formLabelWidth">
          <el-input v-model="form.goodsAddress" autocomplete="off"></el-input>
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
import { list, deleteGoods, updateGoods } from "@/api/goods";
export default {
  activated() {
    const data = {
      pageNum: 1,
      pageSize: 10,
    };
    console.log("data", data);
    list(data).then((res) => {
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
      pageSized: 10,
      currentPage: 1,
      dialogFormVisible: false,
      loading: false,
      form: {},
      formLabelWidth: "120px",
      options: [
        {
          value: "0",
          label: "售卖",
        },
        {
          value: "1",
          label: "已下架",
        },
        {
          value: "2",
          label: "无库存",
        },
      ],
    };
  },
  filters: {
    goodsStatusFilter: (value) => {
      if (value == 0) {
        return "售卖";
      }
      if (value == 1) {
        return "已下架";
      }
      return "无库存";
    },
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    search() {
      console.log("search", this.input);
    },
    handleCurrentChange(e) {
      console.log("handleCurrentChange , e", e);
      this.currentPage = e;
    },
    handleEdit(data) {
      this.form = JSON.parse(JSON.stringify(data));
      this.dialogFormVisible = true;
      console.log("handleEdit edit", data);
    },
    handleDelete(data) {
      console.log("handleDelete delete", data);
      deleteGoods(data.goodsId).then((res) => {
        console.log("删除商品成功");
        getList();
      });
    },
    update() {
      console.log(this.form);
      this.loading = true;
      updateGoods(this.form).then((res) => {
        console.log("更新商品信息成功");
        this.loading = false;
        this.dialogFormVisible = false;
        this.getList();
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
        const { list } = res.data;
        this.tableData = list;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
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
