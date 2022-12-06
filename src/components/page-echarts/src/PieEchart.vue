<template>
  <div class="pie-echart">
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
  pieData: IEchartValueType[]
}

const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => ({
  title: {
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: props.pieData,
      right: '-20%',
      bottom: '-20%',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}))
</script>

<style scoped>
.pie-echart {
}
</style>
