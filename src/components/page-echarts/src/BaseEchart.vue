<template>
  <div class="base-echarts">
    <div class="echart h-[250px]" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface IProps {
  option: EChartsOption
}

const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })

  watchEffect(() => {
    echartInstance.setOption(props.option)
  })

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style scoped>
.base-echarts {
}
</style>
