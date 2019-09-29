<template>
  <div id="list">
    <el-timeline>
      <el-timeline-item
        v-for="item in versions"
        :key="item.id"
        :timestamp="item.published_at"
        placement="top"
      >
        <el-card>
          <h4>{{item.tag_name}}</h4>
          <p>
            发布于:
            <el-tag>{{item.published_at}}</el-tag>
          </p>
          <p>
            是否正式版本:
            <el-tag type="success" v-if="!item.prerelease">是</el-tag>
            <el-tag type="danger" v-if="item.prerelease">否</el-tag>
          </p>
          <p>
            <a :href="item.html_url">查看</a>
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { Notification } from "element-ui";

export default {
  name: "detail",
  data() {
    return {
      versions: []
    };
  },
  created() {
    var owner = this.$route.params.owner;
    var repo = this.$route.params.repo;

    this.axios({
      url: `https://api.github.com/repos/${owner}/${repo}/releases`,
      method: "get"
    })
      .then(res => {
        console.log(res.data);
        this.versions = res.data;
      })
      .catch(err => {
        // console.log(err);
        Notification.error({
          title: "获取版本列表失败",
          message: err
        });
      });
  }
};
</script>

<style scoped>
</style>
