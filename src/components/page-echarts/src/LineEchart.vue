<template>
  <div class="line-echart">
    <base-echart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './BaseEchart.vue'
import type { EChartsOption } from 'echarts'
import type IEchartValueType from '../types/type'

// console.log(categoryCountData)
interface IProps {
  xData: string[]
  yData: number[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => ({
  xAxis: {
    type: 'category',
    data: props.xData,
    axisLabel: {
      interval: 0
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.yData,
      type: 'line'
    }
  ]
}))
</script>

<style scoped>
.line-echart {
}
</style>
