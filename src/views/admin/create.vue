<template>
  <div class="creare-admin-container">
    <h3>新建管理员</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="管理员ID" label-width="120px" label-position="left">
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.id"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="管理员昵称"
        label-width="120px"
        label-position="left"
      >
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="管理员密码"
        label-width="120px"
        label-position="left"
      >
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.pwd"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="管理员联系方式"
        label-width="120px"
        label-position="left"
      >
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.phone"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create } from "@/api/user";
export default {
  data() {
    return {
      form: {
        name: "",
        id: "",
        pwd: "",
        phone: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const data = {
        adminId: this.form.id,
        adminPassword: this.form.pwd,
        adminName: this.form.name,
        adminPhone: this.form.phone,
      };
      console.log(data);
      create(data).then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.creare-admin {
  &-container {
    margin: 30px;
    white-space: nowrap;
  }
}
</style>
