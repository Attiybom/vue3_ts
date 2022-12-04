<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @refresh-click="handleRefreshClick"
    />
    <el-divider />
    <page-content
      ref="pageContentRef"
      @create-page-click="handleCreateClick"
      @update-page-click="handleUpdateClick"
    />
    <page-modal ref="pageModalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from './cpns/PageSearch.vue'
import PageContent from './cpns/PageContent.vue'
import PageModal from './cpns/PageModal.vue'
import { ref } from 'vue'

const pageContentRef = ref<InstanceType<typeof PageContent>>()
const pageModalRef = ref<InstanceType<typeof PageModal>>()
const handleQueryClick = (formData: any) => {
  pageContentRef.value?.fetchPageListData(formData)
}
const handleRefreshClick = () => {
  pageContentRef.value?.fetchPageListData()
}
const handleCreateClick = () => {
  pageModalRef.value?.openModal()
}
const handleUpdateClick = (data: any) => {
  pageModalRef.value?.openModal(false, data)
  // console.log(data);
}
</script>

<style scoped>
</style>
