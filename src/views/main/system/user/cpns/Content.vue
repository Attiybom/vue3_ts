<template>
  <div class="content">
    <div class="head flex items-center justify-between mb-3">
      <h2>用户列表</h2>
      <el-button type="primary" @click="">新建用户</el-button>
    </div>
    <!-- <el-divider /> -->

    <el-table :data="userList" border lazy style="width: 100%" size="small" class=" rounded">
      <el-table-column align="center" type="selection" width="40" />
      <el-table-column align="center" type="index" label="序号" width="55" />
      <!-- 数据 -->
      <el-table-column align="center" prop="name" label="用户名" width="100" />
      <el-table-column
        align="center"
        prop="realname"
        label="真实姓名"
        width="80"
      />
      <el-table-column
        align="center"
        prop="cellphone"
        label="手机号码"
        width="100"
      />
      <el-table-column align="center" prop="enable" label="状态" width="70">
        <template #default="{ row }">
          <el-button
            :type="row.enable ? 'success' : 'warning'"
            size="small"
            plain
            @click="handleChangeEnable(row)"
          >
            {{ row.enable ? '启用' : '禁用' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="createAt" label="创建时间" >
        <template #default="{row}">
          {{ formatDate(row.createAt) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="updateAt" label="更新时间">
        <template #default="{row}">
          {{ formatDate(row.updateAt) }}
        </template>
      </el-table-column>
      <!-- 按钮 -->
      <el-table-column align="center" label="操作" width="140">
        <template #default="scope">
          <el-button type="primary" text size="small" @click="">编辑</el-button>
          <el-button type="danger" text size="small" @click="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class=" bg-white flex items-center justify-center rounded">
      <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import {formatDate} from "@/utils/formatDate"

const systemStore = useSystemStore()
const pageSize = ref(10)//分页组件的一次展示多少条数据
const currentPage = ref(1);//分页组件的当前页面

// 进入页面，请求数据
fetchUserListData()

// 获取数据
const { userList, totalCount } = storeToRefs(systemStore)
// console.log(userList)

// 状态改变
const handleChangeEnable = (row:any) => {
  row.enable = !row.enable
}

// 分页
const handleSizeChange = () => {
  console.log('handleSizeChange');
}

const handleCurrentChange = () => {
  fetchUserListData()
  console.log('handleCurrentChange');
}

// 用户列表相关请求
function fetchUserListData() {
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;

  systemStore.getUserListAction({
    offset,
    size
  }) //发送网络请求
}

</script>

<style scoped></style>
