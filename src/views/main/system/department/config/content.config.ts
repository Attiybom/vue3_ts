const contentConfig = {
  pageName: 'department',
  header: {
    title: '部门列表',
    btnTitle: '新建部门'
  },
  listData: [
    // 选择与序号
    {
      type: 'selection',
      label: '全选',
      prop: 'selection',
      width: '40'
    },
    {
      type: 'index',
      label: '序号',
      prop: 'index',
      width: '55'
    },

    // 一般数据
    {
      type: 'normal',
      label: '部门名称',
      prop: 'name',
      width: '100'
    },
    {
      type: 'normal',
      label: '部门领导',
      prop: 'leader',
      width: '80'
    },
    {
      type: 'normal',
      label: '上级部门',
      prop: 'parentId',
      width: '100'
    },

    // 定制化
    {
      type: 'custom',
      slotName: 'leader',
      label: '部门领导(可定制)',
      prop: 'leader',
      width: '100'
    },

    // 时间
    {
      type: 'timer',
      label: '创建时间',
      prop: 'createAt',
      width: ''
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt',
      width: ''
    },

    // 操作
    {
      type: 'operation',
      label: '操作',
      prop: '',
      width: '140'
    }
  ]
}

export default contentConfig
