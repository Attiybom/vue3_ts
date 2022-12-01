<script setup lang="ts">
import AdminHeader from '@/components/admin-header/AdminHeader.vue';
import AsideMenu from '@/components/aside-menu/AsideMenu.vue';
// 退出登录的逻辑
// import { LOGIN_TOKEN } from '@/global/constants';
// import { useRouter } from "vue-router"
// import { localCache } from '@/utils/cache';

// const router = useRouter()
// const handleLogout = () => {
//   // 1.删除token
//   // 2.跳转login
//   localCache.removeCache(LOGIN_TOKEN);
//   router.push('/login')
// }

</script>

<template>


    <!-- <el-button type="primary" size="default" @click="handleLogout">退出登录</el-button> -->

    <el-container class="box">
      <el-aside width="200px"  >
        <aside-menu />
      </el-aside>
      <el-container>
        <el-header>
          <admin-header />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.el-header {
  height: 45px;
  @apply flex items-center
}
.el-main {
  color: aliceblue;
}
</style>
