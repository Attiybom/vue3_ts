<template>
  <div class="aside-menu">
    <div class="menu-header flex items-center justify-around h-[45px]">
      <img
        src="../../assets/img/favicon.ico"
        alt=""
        class="w-[20px] h-[20px]"
      />
      <p v-show="!isCollapse" class="title">后台管理系统</p>
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
            <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
              {{ subitem.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useLoginStore from '@/stores/login/login'
const router = useRouter()
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})


const loginStore = useLoginStore()
const menuData = loginStore.userMenus

// 菜单项点击切换二级路由
const handleItemClick = (subitem:any) => {
  // console.log(subitem.url);
  const url = subitem.url;
  router.push(url)
}

</script>

<style scoped>
.aside-menu {
  color: aliceblue;
}

.title {
  transition: all 0.3s ease;
}

.menu-header {
  background-color: transparent;
}
</style>
