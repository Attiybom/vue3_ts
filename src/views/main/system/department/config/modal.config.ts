// import useMainStore from '@/stores/main'

// const mainstore = useMainStore()
// const { departmentList } = mainstore

const modalConfig = {
  pageName: 'department',
  header: {
    createTitle: '新建部门',
    updateTitle: '编辑部门'
  },
  formData: [
    {
      type: 'input',
      label: '部门名称：',
      prop: 'name',
      placeholder: '请输入部门名称',
      initValue: ''
    },
    {
      type: 'input',
      label: '部门领导：',
      prop: 'leader',
      placeholder: '请输入部门领导',
      initValue: ''
    },
    {
      type: 'select',
      label: '上级部门：',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
      // optionC: departmentList
    }
  ]
}

export default modalConfig
