<template>
  <div class="count-card">
    <el-card shadow="hover">
      <div class="top flex items-center justify-between">
        <span class="text-xs text-gray-400">{{ title }}</span>
        <div class="icon cursor-pointer">
          <el-tooltip effect="dark" :content="tips" placement="top">
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="center text-xl mt-1 mb-1" ref="countupNum1Ref">
        {{ number1 }}
      </div>
      <div class="bottom text-xs">
        <span>{{ subtitle }}</span>
        <span class="ml-1" ref="countupNum2Ref">{{ number2 }}</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'
interface IProps {
  amount?: string
  title?: string
  tips?: string
  subtitle?: string
  number1?: number
  number2?: number
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有商品的总销量',
  subtitle: '商品总销量',
  number1: 509989,
  number2: 509989
})

// 动画相关
const countupNum1Ref = ref<HTMLElement>()
const countupNum2Ref = ref<HTMLElement>()
const saleroomPrefix = props.amount === 'saleroom' ? '￥' : ''
onMounted(() => {
  const countupNum1 = new CountUp(countupNum1Ref.value!, props.number1, {
    prefix: saleroomPrefix
  })
  const countupNum2 = new CountUp(countupNum2Ref.value!, props.number2, {
    prefix: saleroomPrefix
  })
  countupNum1.start()
  countupNum2.start()
})
</script>

<style scoped>
.count-card {
}
</style>
