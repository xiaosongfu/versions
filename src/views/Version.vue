<template>
    <div class="version">
        <p>版本号: <el-tag v-text="version" type="danger"></el-tag></p>
        <p>构建时间: <el-tag v-text="buildDate"></el-tag></p>
    </div>
</template>

<script>
export default {
    name: "version",
    data() {
        return {
            version: process.env.VUE_APP_VERSION,
            buildDate: process.env.VUE_APP_BUILD_DATE
        }
    }
}
</script>

<style scoped>
.version {
    margin: 0 auto;
}
</style>