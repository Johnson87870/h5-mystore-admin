<template>
  <div class="oder-list-container">
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
      <el-table-column prop="orderBuyDetails" label="订单详情" width="300">
      </el-table-column>
      <el-table-column  prop="orderBuyStatus" label="订单状态" width="120">
           <template slot-scope="scope">
          {{ scope.row.orderBuyStatus | oderStatusFormat }}
        </template>
      </el-table-column>
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
      :current-page="currentPage"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

       <el-dialog title="订单信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item  label="订单编号" :label-width="formLabelWidth">
          <el-input disabled v-model="form.orderId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" :label-width="formLabelWidth">
          <el-input disabled v-model="form.orderCreateTime" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="买家编号" :label-width="formLabelWidth">
          <el-input disabled v-model="form.orderBuyerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单价格" :label-width="formLabelWidth">
          <el-input disabled v-model="form.orderBuyPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="订单状态" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.goodsStatus" autocomplete="off"></el-input> -->
          <el-select disabled v-model="form.orderBuyStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item disabled label="订单申请" :label-width="formLabelWidth">
        <el-input disabled v-model="form.orderApply" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  label="订单反馈" :label-width="formLabelWidth">
          <el-input disabled v-model="form.orderFeedback" autocomplete="off"></el-input>
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
import { list , searchOder, deleteOder} from '@/api/oder';
export default {

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
          label: "未支付",
        },
        {
          value: "1",
          label: "已支付",
        },
        {
          value: "2",
          label: "申请退货",
        },
        {
          value: "3",
          label: "申请投诉",
        },
        {
          value: "4",
          label: "退货成功",
        },
        {
          value: "5",
          label: "投诉成功",
        },
        {
          value: "6",
          label: "退货驳回",
        },
        {
          value: "7",
          label: "投诉驳回",
        },
      ],
    };
  },
  filters: {
    oderStatusFormat: (value) => {
      console.log('value', value)
      const obj = {
        '0': '未支付',
        '1': '已支付',
        '2': '申请退货',
        '3': '申请投诉',
        '4': '退货成功',
        '5': '投诉成功',
        '6': '退货驳回',
        '7': '投诉驳回'
      }
      return obj[value]
    }
  },
   activated() {
      const data = {
      pageNum: 1,
      pageSize: 10,
    }
    list(data).then((res) => {
      const { total, list } = res.data;
      console.log('res', list)
      this.total = total;
      this.tableData = list;
    });
  },
  methods: {
    search() {
      searchOder(this.input).then((res) => {
          this.tableData = [res.data];
      })
    },
    handleCurrentChange(e) {
      this.currentPage = e;
      console.log("handleCurrentChange , e", e);
    },
    handleEdit(data) {
      console.log("handleEdit edit", data);
      this.form = JSON.parse(JSON.stringify(data));
      this.dialogFormVisible = true;
    },
    handleDelete(data) {
      console.log("handleDelete delete", data);
      deleteOder(data.orderId).then((res) => {
        console.log('删除订单成功');
        getList();
      })
    },
    update() {
      this.dialogFormVisible = false;
    },
    handleClick(row) {
      console.log(row);
    },
    getList() {
    const data = {
      pageNum: this.currentPage,
      pageSize: this.pageSized
    }
    list(data).then((res) => {
      const { total, list } = res.data;
      this.total = total;
      this.tableData = list;
    })
    }
  },
};
</script>

<style lang="scss" scoped>
.oder-list {
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
