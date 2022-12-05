import useMainStore from '@/stores/main'

const modalConfig = {
  pageName: 'menu',
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
      label: '角色介绍：',
      prop: 'intro',
      placeholder: '请输入角色介绍',
      initValue: ''
    },
  ]
}

export default modalConfig
