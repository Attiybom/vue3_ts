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
      <el-button type="primary" class="w-[250px]" @click="onsubmit"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import PanelAccount from "./PanelAccount.vue"
import PanelPhone from "./PanelPhone.vue"

const router = useRouter()
const activeName = ref('account')
const isRemPassword = ref(false)

const panelAccountRef = ref<InstanceType<typeof PanelAccount>>()


const onsubmit = () => {
  if (activeName.value === 'account') {
    console.log('账号登录方式');
    panelAccountRef.value?.accountLogin()
  } else {
    console.log('手机登录方式')
  }
  // router.push('/admin')
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
