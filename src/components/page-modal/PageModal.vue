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
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName" />
              </template>
            </el-form-item>
          </template>
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
  treeCheckData?: any
}

const props = defineProps<IProps>()

// 内容表单
const formRef = ref<InstanceType<typeof ElForm>>()
const initForm: any = {}
for (const item of props.modalConfig.formData) {
  initForm[item.prop] = item.initValue ?? ''
}
const form = reactive<any>(initForm)

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
      form[key] = updateData[key] //如果是编辑操作，则进行数据回显
    }
    updateInfo.value = updateData
  } else {
    isCreateRef.value = true
    for (const key in form) {
      const item = props.modalConfig.formData.find(
        (item) => item.prop === key
      ) as any
      form[key] = item ? item.initValue : '' //新建操作，数据初始化
    }
    updateInfo.value = null
  }
}
const closeModal = () => {
  dialogVisible.value = false
}

// 创建/修改用户
const handleConfirmClick = () => {
  let info = form
  if (props.treeCheckData) {
    //树形控件数据
    info = { ...form, ...props.treeCheckData }
  }

  if (!isCreateRef.value && updateInfo.value) {
    systemStore
      .updatePageAction(props.modalConfig.pageName, updateInfo.value.id, info)
      .then(() => {
        toast('编辑成功！')
      })
  } else {
    systemStore.createPageAction(props.modalConfig.pageName, info).then(() => {
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
