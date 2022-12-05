// import useMainStore from '@/stores/main'

const modalConfig = {
  pageName: 'role',
  header: {
    createTitle: '新建角色',
    updateTitle: '编辑角色'
  },
  formData: [
    {
      type: 'input',
      label: '角色名称：',
      prop: 'name',
      placeholder: '请输入角色名称',
      initValue: ''
    },
    {
      type: 'input',
      label: '权限介绍：',
      prop: 'intro',
      placeholder: '请输入权限介绍',
      initValue: ''
    },
    {
      type: 'custom',
      prop: 'parentId',
      slotName: 'menulist'
    }
  ]
}

export default modalConfig
