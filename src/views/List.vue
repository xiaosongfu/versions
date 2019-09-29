<template>
  <div>
    <el-button type="primary" @click="showAddDialog = true">添加</el-button>

    <el-dialog title="新增项目" :visible.sync="showAddDialog">
      <el-form :model="form">
        <el-form-item label="项目名称" label-width="120px">
          <el-input v-model="addFormData.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="owner" label-width="120px">
          <el-input v-model="addFormData.owner" clearable></el-input>
        </el-form-item>
        <el-form-item label="repo" label-width="120px">
          <el-input v-model="addFormData.repo" clearable></el-input>
        </el-form-item>
        <el-form-item label="最新版本" label-width="120px">
          <el-input v-model="addFormData.latestVersion" disabled></el-input>
        </el-form-item>
        <el-form-item label="发布时间" label-width="120px">
          <el-input v-model="addFormData.releaseDate" disabled></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="info" @click="getLatestVersion">查询最新版本</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </div>
    </el-dialog>

    <el-divider></el-divider>

    <el-button
      v-for="item in items"
      :key="item.id"
      @click="clickItem(item.owner, item.repo)"
    >{{item.name}} - {{item.latestVersion}} @ {{item.releaseDate}}</el-button>
  </div>
</template>

<script>
/* eslint-disable */

import { Notification } from "element-ui";

export default {
  name: "list",
  data() {
    return {
      showAddDialog: false,
      addFormData: {
        name: "",
        owner: "",
        repo: "",
        latestVersion: "",
        releaseDate: ""
      },

      category: "",
      items: []
    };
  },
  methods: {
    getLatestVersion() {
      if (
        this.addFormData.owner.trim() == "" ||
        this.addFormData.repo.trim() == ""
      ) {
        Notification.error({
          title: "查询失败",
          message: "仓库信息不能为空"
        });

        return;
      }

      this.axios({
        url: `https://api.github.com/repos/${this.addFormData.owner}/${this.addFormData.repo}/releases/latest`,
        method: "get"
      })
        .then(res => {
          this.addFormData.latestVersion = res.data.tag_name;
          this.addFormData.releaseDate = res.data.published_at;
        })
        .catch(err => {
          // console.log(err);
          Notification.error({
            title: "查询失败",
            message: err
          });
        });
    },
    add() {
      if (
        this.addFormData.name.trim() == "" ||
        this.addFormData.owner.trim() == "" ||
        this.addFormData.repo.trim() == ""
      ) {
        Notification.error({
          title: "添加失败",
          message: "输入框不能为空"
        });

        return;
      }

      this.axios({
        url: "item",
        method: "post",
        data: JSON.stringify({
          category: this.category,
          name: this.addFormData.name,
          owner: this.addFormData.owner,
          repo: this.addFormData.repo,
          latestVersion: this.addFormData.latestVersion,
          releaseDate: this.addFormData.releaseDate
        })
      })
        .then(res => {
          Notification.success({
            title: "添加成功",
            message: "添加成功"
          });

          this.showAddDialog = false;
        })
        .catch(err => {
          Notification.error({
            title: "添加失败",
            message: err
          });
        });
    },
    clickItem(owner, repo) {
      this.$router.push({
        name: "detail",
        params: {
          owner: owner,
          repo: repo
        }
      });
    }
  },
  created() {
    this.category = this.$route.params.category;
    this.axios
      .get("/item", {
        params: {
          q: "category:" + this.category
        }
      })
      .then(res => {
        this.items = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
</style>
