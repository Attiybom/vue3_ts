<template>
  <div class="user">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @refresh-click="handleRefreshClick"
    />
    <el-divider />
    <page-content
      ref="pageContentRef"
      :content-config="contentConfig"
      @create-page-click="handleCreateClick"
      @update-page-click="handleUpdateClick"
    />
    <PageModal ref="pageModalRef" :modal-config="modalConfig" :tree-check-data="treeCheckData">
      <template #menulist>
        <el-tree
          :data="menuList"
          :props="{
            label: 'name',
            children: 'children'
          }"
          show-checkbox
          node-key="id"
          @check="handleMenuListCheck"
        />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/PageContent.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/PageModal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 树形控件相关
import useMainStore from '@/stores/main'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const mainStore = useMainStore()
const { menuList } = storeToRefs(mainStore)

// 复选框点击，回传数据
const treeCheckData = ref({})
const handleMenuListCheck = (data1: any, data2: any) => {
  // console.log(data1, data2)
  treeCheckData.value = [...data2.checkedKeys, ...data2.halfCheckedKeys]
}

// 逻辑按键相关
const { pageContentRef, handleQueryClick, handleRefreshClick } =
  usePageContent()
const { pageModalRef, handleCreateClick, handleUpdateClick } = usePageModal()
</script>

<style scoped>
.user {
}
</style>
