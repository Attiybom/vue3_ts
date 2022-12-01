<template>
  <div class="admin-header">
    <div class="menu-icon flex items-center">
      <el-icon size="24px"><Fold /></el-icon>
    </div>
    <div class="content ml-3">
      <div class="breadcrumb">面包屑</div>
      <div class="userinfo">个人信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.admin-header{
  width: 100%;
  color: aliceblue;
  @apply flex items-center
}
.content {
  width: 100%;
  height: 100%;
  @apply flex items-center justify-between
}
</style>
