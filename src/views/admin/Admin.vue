<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants';
import { useRouter } from "vue-router"
import { localCache } from '@/utils/cache';

const router = useRouter()
const handleLogout = () => {
  // 1.删除token
  // 2.跳转login
  localCache.removeCache(LOGIN_TOKEN);
  router.push('/login')
}
</script>

<template>
  <div class="admin">
    <el-button type="primary" size="default" @click="handleLogout">退出登录</el-button>

  </div>
</template>

<style scoped>
.admin{

}
</style>
