<template>
  <div class="rose-echart">
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
  roseData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => ({
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  tooltip: {
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      type: 'pie',
      radius: [10, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      left: '-15%',
      bottom: '-10%',
      itemStyle: {
        borderRadius: 8
      },
      data: props.roseData
    }
  ]
}))
</script>

<style scoped>
.rose-echart {
}
</style>
