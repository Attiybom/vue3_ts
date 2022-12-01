<script setup lang="ts">
import MainHeader from '@/components/main-header/MainHeader.vue';
import AsideMenu from '@/components/aside-menu/AsideMenu.vue';
import { ref } from 'vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold:boolean) => {
  isCollapse.value = isFold
}

</script>

<template>

    <el-container class="box">
      <el-aside :width=" isCollapse ? '45px' : '200px'"  >
        <aside-menu :is-collapse="isCollapse"  />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange" />
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

.el-aside {
  transition: all 0.3s ease;
}
.el-header {
  height: 45px;
  @apply flex items-center
}
.el-main {
  color: aliceblue;
}
</style>
