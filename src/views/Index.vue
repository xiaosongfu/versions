<template>
  <div>
    <el-button type="primary" @click="showAddDialog = true">添加</el-button>

    <el-dialog title="新增类别" :visible.sync="showAddDialog">
      <el-form :model="form">
        <el-form-item label="类别名称" label-width="120px">
          <el-input v-model="addFormData.categoryName" clearable></el-input>
        </el-form-item>
        <el-form-item label="类别 key" label-width="120px">
          <el-input v-model="addFormData.categoryKey" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>

    <el-divider></el-divider>

    <el-button
      v-for="item in category"
      :key="item.id"
      @click="clickCategory(item.key)"
    >{{item.name}}</el-button>
  </div>
</template>

<script>
/* eslint-disable */

import { Message, Notification } from "element-ui";

export default {
  name: "index",
  data() {
    return {
      showAddDialog: false,
      addFormData: {
        categoryName: "",
        categoryKey: ""
      },
      category: []
    };
  },
  methods: {
    clickCategory(cate) {
      this.$router.push({
        name: "list",
        params: {
          category: cate
        }
      });
    },

    add() {
      // 先判断是否为空
      if (
        this.addFormData.categoryName.trim() == "" ||
        this.addFormData.categoryKey.trim() == ""
      ) {
        Notification.error({
          title: "添加失败",
          message: "输入框不能为空"
        });

        return;
      }

      // 发生请求
      this.axios({
        url: "category",
        method: "post",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        data: JSON.stringify({
          name: this.addFormData.categoryName,
          key: this.addFormData.categoryKey
        })
      })
        .then(res => {
          this.showAddDialog = false;

          Notification.success({
            title: "添加成功",
            message: "添加类别成功"
          });
        })
        .catch(err => {
          console.log(err);
          Notification.error({
            title: "添加失败",
            message: "添加类别失败"
          });
        });
    }
  },
  created() {
    this.axios
      .get("category")
      .then(res => {
        this.category = res.data;
        // console.log(res)

        Message.success({
          message: "加载成功"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
