<template>
  <div class="panel-account">
    <el-form
      label-position="right"
      :model="account"
      :rules="accountRules"
      ref="formRef"
      status-icon
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from "@/stores/login/login"
import { accountLoginRequest } from '@/services/login/login'

const account = reactive({
  username: '',
  password: ''
})
const accountRules: FormRules = {
  username: [
    {
      required: true,
      message: '账号不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,15}$/,
      message: '账号由3~15位字母或数字组成',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,15}$/,
      message: '密码由3~15位字母或数字组成',
      trigger: 'blur'
    }
  ]
}

// 登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore()
const accountLogin = () => {
  // console.log('accountLogin')
  formRef.value?.validate((vaild) => {
    if (vaild) {
      // 获取请求所需要的数据
      const name = account.username;
      const password = account.password;
      // accountLoginRequest({ name, password }).then(res => {
      //   console.log(res);
      // })
      loginStore.accountLoginAction({
        name,
        password
      })
    } else {
      ElMessage({
        showClose: true,
        message: '登录失败!',
        type: 'error'
      })
    }
  })
}

defineExpose({
  accountLogin
})
</script>

<style scoped>
.panel-account {
}
</style>
