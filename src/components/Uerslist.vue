<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">添加</el-button>

    <!-- 序列表 -->
    <el-table :data="userlist" stripe>
      <el-table-column label="序列" type="index"> </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="头衔" prop="position"></el-table-column>
      <el-table-column label="创建时间">
        <!-- 作用域插槽 -->
        <template #default="scope">
          {{ scope.row.addtime | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <div>
            <router-link :to="'/users/' + row.id">详情</router-link>&nbsp;
            <a href="#" @click.prevent="onDelete(row.id)">删除</a>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <el-dialog
      title="添加新用户"
      :visible.sync="dialogVisible"
      width="50%"
      ref=""
      @close="onDialogClose"
    >
      <!-- 添加用户表单 -->
      <el-form
        :model="form"
        label-width="100px"
        :rules="formRules"
        ref="addForm"
      >
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄" prop="age">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="用户头衔" prop="position">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
      </el-form>

      <!-- 添加页面的尾部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onAddNewUser"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Userlist",
  data() {
    let checkAge = (rules, value, cb) => {
      if (!Number.isInteger(value)) {
        return cb(new Error("年龄需为整数"));
      }
      if (value < 1 || value > 100) {
        return cb(new Error("年龄必须在1-100之间"));
      }
      cb();
    };
    return {
      userlist: [],
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        position: "",
      },
      formRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        age: [
          { required: true, message: "请输入性别", trigger: "blur" },
          { validator: checkAge, trigger: "blur" },
        ],
        position: [
          { required: true, message: "请输入头衔", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getUserlist() {
      const { data: res } = await this.$http.get("/api/users");
      if (res.status !== 0) return console.log("请求数据失败");
      this.userlist = res.data;
      console.log(this.userlist);
    },
    onDialogClose() {
      // console.log("ok");
      this.$refs.addForm.resetFields();
    },
    onAddNewUser() {
      //问题这里箭头函数模式为 （）=>{}但是解构为异步是添加在（）内是会报错
      this.$refs.addForm.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("/api/users", this.form);
        if (res.status !== 0) return this.$message.error("添加失败");
        this.$message.success("添加成功");
        this.dialogVisible = false;
        this.getUserlist();
      });
    },
    async onDelete(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") return this.$message.info("取消了删除");
      const { data: res } = await this.$http.delete("/api/users/" + id);
      if (res.status !== 0) return this.$message.error("删除失败");
      this.$message.info("删除成功");
      this.getUserlist();
    },
  },
  created() {
    this.getUserlist();
  },
};
</script>
<style lang='less' scoped>
.el-table {
  margin-top: 30px;
}
</style>