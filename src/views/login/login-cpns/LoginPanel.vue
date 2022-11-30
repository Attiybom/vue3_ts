<template>
  <div class="login-panel flex items-center flex-col justify-around">
    <h2 class="title text-slate-50 text-2xl">后台管理系统</h2>

    <div class="tabs">
      <el-tabs type="border-card" stretch class="w-[250px] rounded">
        <el-tab-pane label="账号登录">
          <div>账号</div>
          <div>密码</div>
        </el-tab-pane>
        <el-tab-pane label="手机登录">
          <div>账号</div>
          <div>密码</div>
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

const router = useRouter()

const isRemPassword = ref(false)

const onsubmit = () => {
  console.log('登录成功')
  router.push('/admin')
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
