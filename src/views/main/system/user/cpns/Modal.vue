<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" title="新建用户" center width="30%">
      <!-- 内容 -->
      <div class="main-content">
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="用户名:" prop="name">
            <el-input placeholder="请输入用户名" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="真实姓名:" prop="realname">
            <el-input placeholder="请输入真实姓名" v-model="form.realname"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="密码:" prop="password">
            <el-input placeholder="请输入密码" v-model="form.password" show-password type="password"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="手机号码:" prop="cellphone">
            <el-input placeholder="请输入手机号码" v-model="form.cellphone"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="选择角色:" prop="roleId">
            <el-input placeholder="请输入角色" v-model="form.roleId"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="选择部门:" prop="department">
            <el-input placeholder="请输入部门" v-model="form.department"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus';
import { ref, reactive } from 'vue'
const dialogVisible = ref(true)

const openModal = () => {
  dialogVisible.value = true
}
const closeModal = () => {
  dialogVisible.value = false
}

// 内容表单
const formRef = ref<InstanceType<typeof ElForm>>()
const form = reactive({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  department:""
})



defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped>
.modal {
}
</style>
