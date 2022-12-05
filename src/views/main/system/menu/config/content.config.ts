const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  listData: [
    // 一般数据
    {
      label: '系统总览',
      prop: 'name'
    },
    {
      label: '级别',
      prop: 'type',
      width: '50'
    },
    {
      label: '菜单url',
      prop: 'url',
      width: '100'
    },
    {
      label: '菜单icon',
      prop: 'icon',
      width: '120'
    },
    {
      label: '排序',
      prop: 'sort',
      width: '50'
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
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: { children: 'children' }
  }
}

export default contentConfig
