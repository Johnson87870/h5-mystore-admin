<template>
  <div class="complanit-list-container">
    <div class="search">
      <el-input v-model="input" placeholder="输入管理员ID、昵称"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="orderCreateTime" label="订单时间" width="120"></el-table-column>
      <el-table-column fixed prop="orderId" label="订单编号" width="150">
      </el-table-column>
      <el-table-column prop="orderBuyerId" label="买家编号" width="120">
      </el-table-column>
      <el-table-column prop="orderBuyPrice" label="订单价格" width="150">
      </el-table-column>
      <el-table-column prop="orderBuyDeails" label="订单详情" width="300">
      </el-table-column>
      <el-table-column prop="orderBugStatus" label="订单状态" width="120"></el-table-column>
      <el-table-column prop="orderApply" label="订单申请" width="120"></el-table-column>
      <el-table-column prop="orderFeedback" label="订单反馈" width="120"></el-table-column>
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
      :page-sizes="pageSized"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },

  data() {
    return {
      input: "",
      tableData: [
        {
          orderBuyerId: "332",
          orderApply: "John",
          orderFeedback: "上海",
          orderBuyDeails: "19019008090",
          orderId: "1",
          orderBuyPrice: "123456aa",
          orderCreateTime: '2022-07-30 8:30:21',
          orderBugStatus: '1',
        },
        {
          orderBuyerId: "12",
          orderApply: "Johnson",
          orderFeedback: "上海",
          orderBuyDeails: "19019008090",
          orderId: "0",
          orderBuyPrice: "0902112as",
          orderCreateTime: '2022-07-30 8:30:21',
           orderBugStatus: '1',
        },
        {
          orderBuyerId: "10",
          orderApply: "Johnthan",
          orderFeedback: "上海",
          orderBuyDeails: "19019008090",
          orderId: "1",
          orderBuyPrice: "ohsksnas1",
           orderCreateTime: '2022-07-30 8:30:21',
            orderBugStatus: '1',
        },
        {
          orderBuyerId: "12",
          orderApply: "Nick",
          orderFeedback: "上海",
          orderBuyDeails: "19019008090",
          orderId: "0",
          orderBuyPrice: "08820087821kl",
          orderCreateTime: '2022-07-30 8:30:21',
          orderBugStatus: '1',
        },
      ],
      total: 100,
      pageSized: 10,
    };
  },
  methods: {
    search() {
      console.log("search", this.input);
    },
    handleCurrentChange(e) {
      console.log("handleCurrentChange , e", e);
    },
    handleEdit(data) {
      console.log("handleEdit edit", data);
    },
    handleDelete(data) {
      console.log("handleDelete delete", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.complanit-list {
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
