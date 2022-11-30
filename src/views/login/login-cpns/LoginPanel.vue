<template>
  <div class="login-panel flex items-center flex-col justify-around">
    <h2 class="title text-slate-50 text-2xl">后台管理系统</h2>

    <div class="tabs">
      <el-tabs type="border-card" stretch class="w-[250px] rounded" v-model="activeName">

        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="flex items-center justify-around">
              <el-icon><UserFilled /></el-icon>
              <span>账号登录</span>
            </div>
          </template>
          <PanelAccount ref="panelAccountRef" />
        </el-tab-pane>

        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="flex items-center justify-around">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </div>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="footer">
      <div class="password flex items-center justify-between w-[250px]">
        <el-checkbox v-model="isRemPassword" label="记住密码" size="large" />
        <el-link type="primary">忘记密码</el-link>

      </div>
      <el-button type="primary" class="w-[250px]" @click="handleLogin"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from "./PanelAccount.vue"
import PanelPhone from "./PanelPhone.vue"
import { localCache } from '@/utils/cache';

const activeName = ref('account')
// 处理记住密码逻辑
const isRemPassword = ref<boolean>( localCache.getCache('isRemPassword') ?? false)
watch(isRemPassword, (newValue) => {
  localCache.setCache('isRemPassword', newValue)
})
const panelAccountRef = ref<InstanceType<typeof PanelAccount>>()

const handleLogin = () => {
  if (activeName.value === 'account') {
    // console.log('账号登录方式');
    panelAccountRef.value?.accountLogin(isRemPassword.value)
  } else {
    console.log('手机登录方式')
  }
}
</script>

<style scoped>
.login-panel {
  width: 400px;
  height: 300px;
  /* border: 1px solid white; */
}
:deep(.el-checkbox__label){
  color: aliceblue;
}
</style>
