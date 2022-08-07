<template>
  <div class="add-commodity-container">
    <h3>新建管理员</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品ID" label-width="120px" label-position="left">
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.goodsCategoryId"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品名称" label-width="120px" label-position="left">
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.goodsName"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" label-width="120px" label-position="left">
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.goodsPrice"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="商品库存数量"
        label-width="120px"
        label-position="left"
      >
        <el-input
          style="width: 80%; margin-right: auto"
          v-model="form.goodsNumber"
        ></el-input>
        <el-form-item
          label="商品详情信息"
          label-width="120px"
          label-position="left"
        >
          <el-input
            style="width: 80%; margin-right: auto"
            v-model="form.goodsDetails"
          ></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="商品图片" label-width="120px" label-position="left">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept="image/jpeg,image/gif,image/png"
          :multiple="true"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="form.multipartFile"
          :on-change="uploadChange"
          :on-error="uploadError"
          :on-success="uploadSuccess"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addGoods } from "@/api/goods";
export default {
  data() {
    return {
      form: {
        goodsCategoryId: "",
        goodsName: "",
        goodsPrice: "",
        goodsNumber: "",
        goodsDetails: "",
        multipartFile: [
          {
            name: "food.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
          {
            name: "food2.jpeg",
            url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
      const data = new FormData();
      data.append("goodsCategoryId", this.form.goodsCategoryId);
      data.append("goodsName", this.form.goodsName);
      data.append("goodsPrice", this.form.goodsPrice);
      data.append("goodsNumber", this.form.goodsNumber);
      data.append("goodsDetails", this.form.goodsDetails);
      for (let i = 0; i < this.form.multipartFile.length; i++) {
        const element = this.form.multipartFile[i];
        data.append("multipartFile", element);
      }
      addGoods(data).then((res) => {
        console.log("res", res);
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    uploadActionUrl() {},
    uploadError(error) {
      console.log("uploadError", error);
    },
    uploadSuccess(success) {
      console.log("uploadSuccess", success);
    },
    uploadChange(change) {
      console.log("uploadChange", change);
    },
  },
};
</script>

<style lang="scss" scoped>
.add-commodity {
  &-container {
    margin: 30px;
    white-space: nowrap;
  }
}
</style>
