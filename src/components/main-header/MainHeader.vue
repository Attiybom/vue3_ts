<template>
  <div class="main-header">
    <div class="menu-icon flex items-center">
      <el-icon size="24px" @click="foldClick" class="cursor-pointer">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content ml-3">
      <bread-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderInfo from './cpns/HeaderInfo.vue'
import BreadCrumb from './cpns/BreadCrumb.vue'
import { ref } from 'vue'
// 折叠按钮点击
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const foldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value) // 发送事件
}
</script>

<style scoped>
.main-header {
  width: 100%;
  color: aliceblue;
  @apply flex items-center;
}
.content {
  width: 100%;
  height: 100%;
  @apply flex items-center justify-between;
}
</style>
