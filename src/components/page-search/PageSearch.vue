<template>
  <div class="search">
    <el-form
      :model="searchForm"
      label-position="right"
      label-width="100px"
      ref="formRef"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  placeholder="请输入部门名称"
                  v-model="searchForm.name"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm.createAt"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="default"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button type="default" icon="Refresh" @click="handleRefresh"
        >重置</el-button
      >
      <el-button type="primary" icon="Search" class="mr-3" @click="handleQuery"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import searchConfig from '@/views/main/system/department/config/search.config';

// 发送事件
const emit = defineEmits(['queryClick', 'refreshClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
const initForm: any = {}
for (const item of searchConfig.formItems) {
  initForm[item.prop] = item.initValue ?? ''
}
const searchForm = reactive(initForm)


const handleRefresh = () => {
  // 搜索框本身的重置
  formRef.value?.resetFields()
  // 表单数据的重置
  emit('refreshClick')
}

const handleQuery = () => {
  emit('queryClick', searchForm)
}
</script>

<style scoped>
:deep(.el-form-item__label) {
  color: white;
  @apply flex items-center;
}

.btns {
  @apply flex justify-end;
}
</style>