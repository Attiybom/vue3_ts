<template>
  <div class="content">
    <!-- 新建用户 -->
    <div class="head flex items-center justify-between mb-3">
      <h2>{{ contentConfig.header?.title ?? '数据列表' }}</h2>
      <el-button
        v-if="hasCreateAuth"
        type="primary"
        @click="handleCreateClick"
        >{{ contentConfig.header?.btnTitle ?? '新建数据' }}</el-button
      >
    </div>
    <!-- <el-divider /> -->

    <!-- 表单 -->
    <el-table
      :data="pageList"
      border
      lazy
      style="width: 100%"
      size="small"
      class="rounded"
      :row-key="contentConfig.childrenTree?.rowKey"
      :tree-props="contentConfig.childrenTree?.treeProps"
    >
      <template v-for="item in contentConfig.listData" :key="item.prop">
        <template v-if="item.type === 'selection'">
          <el-table-column align="center" v-bind="item" />
        </template>

        <template v-else-if="item.type === 'timer'">
          <el-table-column align="center" v-bind="item">
            <template #default="{ row }">
              {{ formatDate(row[item.prop]) }}
            </template>
          </el-table-column>
        </template>

        <template v-else-if="item.type === 'operation'">
          <el-table-column align="center" v-bind="item">
            <template #default="{ row }">
              <el-button
                type="primary"
                text
                size="small"
                @click="handleUpdateClick(row)"
                v-if="hasUpdateAuth"
                >编辑</el-button
              >
              <el-button
                type="danger"
                text
                size="small"
                @click="handleDeleteClick(row)"
                v-if="hasDeleteAuth"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>

        <template v-else-if="item.type === 'custom'">
          <el-table-column align="center" v-bind="item">
            <template #default="{ row }">
              <slot :name="item.slotName" v-bind="row" />
            </template>
          </el-table-column>
        </template>

        <template v-else>
          <el-table-column align="center" v-bind="item" />
        </template>
      </template>
    </el-table>

    <!-- 分页 -->
    <div class="bg-white flex items-center justify-center rounded">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @update:page-size="handleSizeChange"
        @update:current-page="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/formatDate'
import { toast } from '@/utils/toast'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title: string
      btnTitle: string
    }
    listData?: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()

const systemStore = useSystemStore()
const pageSize = ref(10) //分页组件的一次展示多少条数据
const currentPage = ref(1) //分页组件的当前页面

systemStore.$onAction(({ name, after }) => {
  after(() => {
    const actionsNameArr = [
      'deletePageListAction',
      'createPageAction',
      'updatePageAction'
    ]
    if (actionsNameArr.includes(name)) {
      currentPage.value = 1
    }
  })
})

// 按钮权限控制
const hasQueryAuth = usePermissions(`${props.contentConfig.pageName}:query`)
const hasCreateAuth = usePermissions(`${props.contentConfig.pageName}:create`)
const hasUpdateAuth = usePermissions(`${props.contentConfig.pageName}:update`)
const hasDeleteAuth = usePermissions(`${props.contentConfig.pageName}:delete`)

// 发送事件
const emit = defineEmits(['createPageClick', 'updatePageClick'])

// 进入页面，请求数据
fetchPageListData()

// 获取数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)
// console.log(pageList)

// 分页
const handleSizeChange = () => {
  fetchPageListData()
}

const handleCurrentChange = () => {
  fetchPageListData()
}

// 用户列表数据相关请求
function fetchPageListData(formData: any = {}) {
  if (!hasQueryAuth) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  systemStore.getPageListAction(props.contentConfig.pageName, {
    offset,
    size,
    ...formData
  }) //发送网络请求
}

// 删除数据
const handleDeleteClick = (row: any) => {
  systemStore
    .deletePageListAction(props.contentConfig.pageName, row.id)
    .then(() => {
      toast('删除成功！')
    })
}
// 新建点击
const handleCreateClick = () => {
  emit('createPageClick')
}

// 编辑资料
const handleUpdateClick = (row: any) => {
  emit('updatePageClick', row)
}

defineExpose({
  fetchPageListData
})
</script>

<style scoped></style>
