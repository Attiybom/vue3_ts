<template>
  <div class="content">
    <div class="head flex items-center justify-between">
      <h2>用户列表</h2>
      <el-button type="primary" @click="">新建用户</el-button>
    </div>
    <!-- <el-divider /> -->

    <el-table :data="userList" border lazy style="width: 100%" size="small">
      <el-table-column align="center" type="selection" width="40" />
      <el-table-column align="center" type="index" label="序号" width="55"  />
      <!-- 数据 -->
      <el-table-column align="center" prop="name" label="用户名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />
      <el-table-column align="center" prop="cellphone" label="手机号码" />
      <el-table-column align="center" prop="enable" label="状态" />
      <el-table-column align="center" prop="createAt" label="创建时间" />
      <el-table-column align="center" prop="updateAt" label="更新时间" />
      <!-- 按钮 -->
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" text size="small" @click="">编辑</el-button>
          <el-button type="danger" text size="small" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
const systemStore = useSystemStore()
systemStore.getUserListAction() //发送网络请求
const { userList, totalCount } = storeToRefs(systemStore)
console.log(userList)
</script>

<style scoped>

</style>
