<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isCreateRef
          ? modalConfig.header.createTitle
          : modalConfig.header.updateTitle
      "
      center
      width="30%"
    >
      <!-- 内容 -->
      <div class="main-content">
        <el-form :model="form" ref="formRef" label-width="100px">
          <template v-for="item in modalConfig.formData" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="form[item.prop]"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="form[item.prop]"
                  :placeholder="item.placeholder"
                  clearable
                  style="width: 100%"
                >
                  <template v-for="el in item.options" :key="el.value">
                    <el-option :label="el.label" :value="el.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </template>
        </el-form>
        <!-- <el-form :model="form" ref="formRef" label-width="80px">
          <el-form-item label="部门名称:" prop="name">
            <el-input
              placeholder="请输入部门名称"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门领导:" prop="leader">
            <el-input
              placeholder="请输入部门领导"
              v-model="form.leader"
            ></el-input>
          </el-form-item>
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
        </el-form> -->
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

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      createTitle: string
      updateTitle: string
    }
    formData: any[]
  }
}

const props = defineProps<IProps>()

// 内容表单
const formRef = ref<InstanceType<typeof ElForm>>()
const initForm: any = {}
for (const item of props.modalConfig.formData) {
  initForm[item.prop] = item.initValue ?? ''
}
const form = reactive<any>(initForm)

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
      const item = props.modalConfig.formData.find((item) => item.prop === key) as any
      form[key] = item ? item.initValue : ''
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
      .updatePageAction(props.modalConfig.pageName, updateInfo.value.id, form)
      .then(() => {
        toast('编辑成功！')
      })
  } else {
    systemStore.createPageAction(props.modalConfig.pageName, form).then(() => {
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

<style scoped></style>
