<template>
  <div class="panel-phone">
    <el-form label-position="right">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="flex">
          <el-input />
          <el-button
            class='ml-2'
            type="primary"
            size="default"
            @click="handlePhoneEmail"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
const handlePhoneEmail = () => {
  console.log('请求验证码')
}
</script>

<style scoped>
.panel-phone {
}
</style>
