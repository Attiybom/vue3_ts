<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isCreateRef ? '新建部门' : '编辑资料'"
      center
      width="30%"
    >
      <!-- 内容 -->
      <div class="main-content">
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="部门名称:" prop="name">
            <el-input
              placeholder="请输入部门名称"
              v-model="form.name"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="部门领导:" prop="leader">
            <el-input
              placeholder="请输入部门领导"
              v-model="form.leader"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="选择部门:" prop="parentId">
            <el-select
              v-model="form.parentId"
              placeholder="请输入上级部门"
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
  leader: '',
  parentId: ''
})

const mainstore = useMainStore()
const systemStore = useSystemStore()
const dialogVisible = ref(false)
const isCreateRef = ref(true)
const updateInfo = ref<any>()

// 打开/关闭弹窗
const openModal = (isCreate: boolean = true, updateData?: any) => {
  dialogVisible.value = true
  if (!isCreate && updateData) {
    isCreateRef.value = false
    for (const key in form) {
      form[key] = updateData[key]
    }
    updateInfo.value = updateData
  } else {
    isCreateRef.value = true
    for (const key in form) {
      form[key] = ''
    }
    updateInfo.value = null
  }
}
const closeModal = () => {
  dialogVisible.value = false
}

// 获取角色与部门数据
const { departmentList } = mainstore

// 创建/修改用户
const handleConfirmClick = () => {
  if (!isCreateRef.value && updateInfo.value) {
    systemStore
      .updatePageAction('department', updateInfo.value.id, form)
      .then(() => {
        toast('编辑成功！')
      })
  } else {
    systemStore.createPageAction('department', form).then(() => {
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

</style>
