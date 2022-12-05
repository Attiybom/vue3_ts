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
        <span class="text-red-600">{{ row.leader }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="pageModalRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/stores/main'
import { computed } from 'vue'

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.departmentList.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formData.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})

const { pageContentRef, handleQueryClick, handleRefreshClick } =
  usePageContent()
const { pageModalRef, handleCreateClick, handleUpdateClick } = usePageModal()
</script>

<style scoped></style>
