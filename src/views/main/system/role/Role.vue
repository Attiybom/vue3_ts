<template>
  <div class="user">
    <page-search :search-config="searchConfig" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue';
import searchConfig from './config/search.config';


</script>

<style scoped>
.user{

}
</style>
