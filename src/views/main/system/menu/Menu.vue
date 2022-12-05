<template>
  <div class="user">
    <PageContent :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/PageContent.vue'
import contentConfig from './config/content.config'
</script>

<style scoped>
.user {
}
</style>
