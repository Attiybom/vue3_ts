<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef ? '新建用户' : '修改资料'"
      center
      width="30%"
    >
      <!-- 内容 -->
      <div class="main-content">
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="用户名:" prop="name">
            <el-input placeholder="请输入用户名" v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="真实姓名:" prop="realname">
            <el-input
              placeholder="请输入真实姓名"
              v-model="form.realname"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item v-if="isCreateRef" label="密码:" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="手机号码:" prop="cellphone">
            <el-input
              placeholder="请输入手机号码"
              v-model="form.cellphone"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="选择角色:" prop="roleId">
            <el-select
              v-model="form.roleId"
              placeholder="请选择角色"
              clearable
              style="width: 100%"
            >
              <template v-for="item in roleList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="选择部门:" prop="departmentId">
            <el-select
              v-model="form.departmentId"
              placeholder="请选择部门"
              clearable
              style="width: 100%"
            >
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
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { ref, reactive } from 'vue'
import useMainStore from '@/stores/main'
import useSystemStore from '@/stores/main/system/system'
import { toast } from '@/utils/toast'

// 内容表单
const formRef = ref<InstanceType<typeof ElForm>>()
const form = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const mainstore = useMainStore()
const systemStore = useSystemStore()
const dialogVisible = ref(false)
const isCreateRef = ref(true)
const userInfo = ref<any>()

// 打开/关闭弹窗
const openModal = (isCreate: boolean = true, userData?: any) => {
  dialogVisible.value = true
  // console.log(userData);
  if (!isCreate && userData) {
    isCreateRef.value = false
    for (const key in form) {
      form[key] = userData[key]
    }
    userInfo.value = userData
  } else {
    isCreateRef.value = true
    for (const key in form) {
      form[key] = ''
    }
    userInfo.value = null
  }
}
const closeModal = () => {
  dialogVisible.value = false
}

// 获取角色与部分不数据
const { roleList, departmentList } = mainstore

// 创建/修改用户
const handleConfirmClick = () => {
  if (!isCreateRef.value && userInfo.value) {
    systemStore.updateUserAction(userInfo.value.id, form).then(() => {
      toast('编辑成功！')
    })
  } else {
    systemStore.createUserAction(form).then(() => {
      toast('新建成功！')
    })
  }

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
