<template>
  <div>
    <el-button
      v-for="item in items"
      :key="item.id"
    >{{item.name}} - {{item.latestVersion}} @ {{item.releaseDate}}</el-button>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "list",
  data() {
    return {
      items: []
    };
  },
  created() {
    var category = this.$route.params.category;
    this.axios
      .get("/item", {
        params: {
          q: "category:" + category
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
