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
          <el-form-item label="用户名：" prop="name">
            <el-input
              placeholder="请输入用户名"
              v-model="searchForm.name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名：" prop="realname">
            <el-input
              placeholder="请输入真实姓名"
              v-model="searchForm.realname"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码：" prop="cellphone">
            <el-input
              placeholder="请输入电话号码"
              v-model="searchForm.cellphone"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态：" prop="enable">
            <el-select
              placeholder="请选择查询的状态"
              size="default"
              v-model="searchForm.enable"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
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
      <el-button type="primary" icon="Search" class="mr-3">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
const formRef = ref<InstanceType<typeof ElForm>>()
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})

const handleRefresh = () => {
  console.log('hello')
  formRef.value?.resetFields()
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
