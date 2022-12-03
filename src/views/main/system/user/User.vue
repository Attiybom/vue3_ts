<template>
  <div class="user">
    <Search @query-click="handleQueryClick" @refresh-click="handleRefreshClick" />
    <el-divider />
    <Content class="content  rounded" ref="contentRef" @create-user-click="handleCreateUser" />

    <!-- 新建用户弹窗 -->
    <modal ref="ModalRef" />
  </div>
</template>

<script setup lang="ts">
import Search from './cpns/Search.vue';
import Content from './cpns/Content.vue';
import Modal from './cpns/Modal.vue';
import { ref } from "vue"

const contentRef = ref<InstanceType<typeof Content>>()
const ModalRef = ref<InstanceType<typeof Modal>>()
// 搜索框的查询点击
const handleQueryClick = (formData: any) => {
  // console.log(formData);

  contentRef.value?.fetchUserListData(formData)
}

// 搜索框的重置点击
const handleRefreshClick = () => {
  contentRef.value?.fetchUserListData()
}

// 新建用户
const handleCreateUser = () => {
  ModalRef.value?.openModal()
}

</script>

<style scoped>


</style>
