<template>
  <div class="oder-list-container">
    <div class="search">
      <el-input v-model="input" placeholder="输入福利券ID"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="welfareId" label="福利券ID" width="120"></el-table-column>
      <el-table-column  prop="welfareBuyerId" label="买家ID" width="150">
      </el-table-column>
      <el-table-column prop="welfarePrice" label="福利券金额" width="120">
      </el-table-column>
      <el-table-column prop="welfareCreateTime" label="生效时间" width="150">
      </el-table-column>
      <el-table-column prop="welfareInvalidTime" label="失效时间" width="150">
      </el-table-column>
      <el-table-column  prop="welfareValid" label="有效期天" width="120">
           <template slot-scope="scope">
          {{ scope.row.welfareValid | welfareValidFormat }}
        </template>
      </el-table-column>
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

       <el-dialog title="福利券信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item  label="福利券ID" :label-width="formLabelWidth">
          <el-input disabled v-model="form.welfareId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="买家ID" :label-width="formLabelWidth">
          <el-input disabled v-model="form.welfareBuyerId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="福利券金额" :label-width="formLabelWidth">
          <el-input disabled v-model="form.welfarePrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生效时间-失效时间">
         <el-date-picker
              v-model="dateTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="生效时间"
              end-placeholder="失效时间"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="dateChange">
            </el-date-picker>
        </el-form-item>
        <el-form-item  label="有效期天" :label-width="formLabelWidth">
          <el-input disabled v-model="form.welfareValid" autocomplete="off"></el-input>
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
import { welfarevoucherList, deleteWelfarevoucher ,searchWelfarevoucher, updateWelfarevocucher} from '@/api/dwc';
import dayjs  from 'dayjs';
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
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      dateTime:''
    };
  },
  filters: {
    welfareValidFormat: (value) => {
      if (value == -1) {
        return '无限期';
      }
      if (value == 0) {
        return '有限期'
      }
      return '已使用'
    }
  },
   activated() {
      const data = {
      pageNum: 1,
      pageSize: 10,
    }
    welfarevoucherList(data).then((res) => {
      console.log('res', res)
      const { total, list } = res.data;
      console.log('res', list)
      this.total = total;
      this.tableData = list;
    });
  },
  methods: {
    search() {
      searchWelfarevoucher(this.input).then((res) => {
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
      deleteWelfarevoucher(data.welfareId).then((res) => {
        console.log('删除福利券成功');
        getList();
      })
    },
    update() {
      this.loading = true;
      updateWelfarevocucher(this.form).then(res => {
        console.log('修改福利券成功');
        this.loading = false;
        this.getList();
        this.dialogFormVisible = false;
      })

    },
    handleClick(row) {
      console.log(row);
    },
    dateChange() {
      const [startTime, lastTime] = this.dateTime;
      this.form.welfareCreateTime = startTime;
      this.form.welfareInvalidTime = lastTime;
      this.form.welfareValid = dayjs(lastTime).diff(startTime, 'day');
    },
    getList() {
    const data = {
      pageNum: this.currentPage,
      pageSize: this.pageSized
    }
    welfarevoucherList(data).then((res) => {
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
