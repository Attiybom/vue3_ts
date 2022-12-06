<template>
  <div class="not-found">
    <el-row :gutter="10">
      <template v-for="item in goodsAmountList" :key="item.amount">
        <el-col :span="6"> <count-card v-bind="item" /> </el-col>
      </template>
    </el-row>

    <el-row :gutter="10" class="mt-2">
      <template v-for="item in 3" :key="item">
        <el-col :span="8">
          <chart-card />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CountCard from './cpns/count-card/CountCard.vue'
import ChartCard from './cpns/chart-card/ChartCard.vue'
import useAnalysisStore from '@/stores/main//analysis/analysis'

const analysisStore = useAnalysisStore()
analysisStore.fetchGoodsAmoutAction()
const { goodsAmountList } = storeToRefs(analysisStore)
</script>

<style scoped>
.not-found {
}

.box {
  border: 1px solid white;
}
</style>
