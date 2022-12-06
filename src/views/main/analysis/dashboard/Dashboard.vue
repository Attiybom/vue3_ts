<template>
  <div class="not-found">
    <el-row :gutter="10">
      <template v-for="item in goodsAmountList" :key="item.amount">
        <el-col :span="6"> <count-card v-bind="item" /> </el-col>
      </template>
    </el-row>

    <el-row :gutter="10" class="mt-2">
      <el-col :span="8">
        <chart-card>
          <PieEchart :pie-data="categoryCountData" />
        </chart-card>
      </el-col>

      <el-col :span="8">
        <chart-card>
          <div class="box">占位</div>
        </chart-card>
      </el-col>

      <el-col :span="8">
        <chart-card>
          <RoseEchart :rose-data="roseData" />
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mt-2">
      <el-col :span="12">
        <chart-card>
          <BarEchart :x-data="xData" :y-data="yData" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <LineEchart :x-data="xData" :y-data="yData" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CountCard from './cpns/count-card/CountCard.vue'
import ChartCard from './cpns/chart-card/ChartCard.vue'
import useAnalysisStore from '@/stores/main//analysis/analysis'
import { computed } from 'vue'
import {
  PieEchart,
  LineEchart,
  RoseEchart,
  BarEchart
} from '@/components/page-echarts/index'

// 获取数据
const analysisStore = useAnalysisStore()
analysisStore.fetchGoodsAmoutAction()
analysisStore.fetchCategoryCountAction()
analysisStore.fetchCategorySaleAction()
analysisStore.fetchCategoryFavorAction()

const { goodsAmountList, categoryCount, categorySale, categoryFavor } =
  storeToRefs(analysisStore)

const categoryCountData = computed(() => {
  return categoryCount.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})

const roseData = computed(() => {
  return categorySale.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})
// barData 和 lineData数据
const xData = computed(() => {
  return categoryFavor.value.map((item) => item.name)
})
const yData = computed(() => {
  return categoryFavor.value.map((item) => item.goodsFavor)
})
</script>

<style scoped>
.not-found {
}

.box {
  border: 1px solid white;
}
</style>
