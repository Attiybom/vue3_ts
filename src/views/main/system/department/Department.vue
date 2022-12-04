<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @refresh-click="handleRefreshClick"
    />
    <el-divider />
    <page-content
      :content-config="contentConfig"
      ref="pageContentRef"
      @create-page-click="handleCreateClick"
      @update-page-click="handleUpdateClick"
    >
      <template #leader="row">
        <span  class=" text-red-600">{{ row.leader }}</span>
      </template>
    </page-content>
    <page-modal ref="pageModalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from './cpns/PageModal.vue'
import { ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'

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

<style scoped></style>
