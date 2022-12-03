<template>
  <div class="search">
    <el-form
      :model="searchForm"
      label-position="right"
      label-width="100px"
      ref="formRef"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称：" prop="name">
            <el-input
              placeholder="请输入部门名称"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门领导：" prop="leader">
            <el-input
              placeholder="请输入查询的部门领导"
              v-model="searchForm.leader"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间：" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="default"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button type="default" icon="Refresh" @click="handleRefresh"
        >重置</el-button
      >
      <el-button type="primary" icon="Search" class="mr-3" @click="handleQuery">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 发送事件
const emit =  defineEmits(['queryClick', 'refreshClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})

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
