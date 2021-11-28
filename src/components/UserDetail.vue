<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户详情</span>
      <el-button style="float: right; padding: 3px 0" type="text">
        返回
      </el-button>
    </div>
    <div class="text item">
      <p>姓名：{{ arr.name }}</p>
      <p>年龄：{{ arr.age }}</p>
      <p>头衔：{{ arr.position }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserDetail",
  props: ["id"],
  data() {
    return {
      arr: {},
    };
  },
  created() {
    this.getUserlist();
  },
  methods: {
    async getUserlist() {
      const { data: res } = await this.$http.get("/api/users/" + this.id);
      if (res.status !== 0) return this.$message.error("获取用户失败");
      this.arr = res.data;
    },
  },
};
</script>

<style lang='less' scoped>
</style>