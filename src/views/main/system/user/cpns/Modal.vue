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
            <el-select v-model="form.roleId" placeholder="请选择角色" clearable style="width: 100%;">
              <template v-for="item in roleList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="选择部门:" prop="departmentId">
            <el-select v-model="form.departmentId" placeholder="请选择部门" clearable style="width: 100%;">
              <template v-for="item in departmentList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCreateUser">
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
import useMainStore from "@/stores/main"
import useSystemStore from '@/stores/main/system/system';

const mainstore = useMainStore();
const systemStore = useSystemStore()
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
  departmentId:""
})

// 获取角色与部分不数据
const {roleList, departmentList} = mainstore

// 创建新用户
const handleCreateUser = () => {
  systemStore.createUserAction(form);

  dialogVisible.value = false
}

defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped>
.modal {
}
</style>
