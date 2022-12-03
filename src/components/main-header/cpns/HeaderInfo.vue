<template>
  <div class="header-info flex items-center">
    <div class="icons w-[80px] flex items-center justify-around">
      <el-icon><Connection /></el-icon>
      <el-icon><ChatDotRound /></el-icon>
      <el-icon><Search /></el-icon>
    </div>
    <div class="flex items-center justify-around ml-3">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        size="small"
      />
      <div>
        <el-dropdown class="ml-3">
          <span class=" text-gray-50">
            {{ userName }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人资料</el-dropdown-item>
              <el-dropdown-item @click="handleUpdatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login';
import { useRouter } from "vue-router"
import { toast } from '@/utils/toast';

const loginStore = useLoginStore();
const userName = loginStore.userInfo.name

// 退出登录的逻辑
const router = useRouter()
const handleLogout = () => {
  // 1.清除本地缓存
  // 2.跳转login
  loginStore.removeLocalCacheAction()
  router.push('/login')
  toast('退出登录成功')
}

const handleUpdatePassword = () => {
  toast('修改密码成功')
}
</script>

<style scoped>
.header-info {
}
</style>
