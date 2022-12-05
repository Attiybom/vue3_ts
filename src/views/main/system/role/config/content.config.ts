const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
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
      label: '角色名称',
      prop: 'name',
      width: '100'
    },
    {
      type: 'normal',
      label: '角色权限',
      prop: 'intro',
      width: '80'
    },

    // 定制化
    // {
    //   type: 'custom',
    //   slotName: 'leader',
    //   label: '部门领导(可定制)',
    //   prop: 'leader',
    //   width: '100'
    // },

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
