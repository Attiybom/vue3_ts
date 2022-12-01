<template>
  <div class="aside-menu">
    <div class="menu-header flex items-center justify-around h-[45px]">
      <img
        src="../../assets/img/favicon.ico"
        alt=""
        class="w-[20px] h-[20px]"
      />
      <p>后台管理系统</p>
    </div>
    <el-menu
      default-active="2"
      unique-opened
      collapse-transition
      :collapse="isCollapse"
    >

      <template v-for="item in menuData" :key="item.id">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            {{ item.name }}
          </template>

          <template v-for="subitem in item.children" :key="subitem.id">
            <el-menu-item :index="subitem.id + ''" >
              {{ subitem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLoginStore from '@/stores/login/login'

const isCollapse = ref(false)
const loginStore = useLoginStore()
const menuData = loginStore.userMenus
</script>

<style scoped>
.aside-menu {
  color: aliceblue;
}

.menu-header {
  background-color: transparent;
}
</style>
