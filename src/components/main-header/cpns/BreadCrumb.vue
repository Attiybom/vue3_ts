<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in BreadCrumb" :key="item.name" >
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import useLoginStore from '@/stores/login/login';
import { useRoute } from 'vue-router';
import { mapPathToBreadCrumb } from '@/utils/map-menus';

const route = useRoute();
const userMenus = useLoginStore().userMenus;
const BreadCrumb = computed(() => {
  return mapPathToBreadCrumb(route.path, userMenus)
});
</script>

<style scoped>
.bread-crumb {
}
:deep(.el-breadcrumb__inner) {
  color: white;
}

</style>
