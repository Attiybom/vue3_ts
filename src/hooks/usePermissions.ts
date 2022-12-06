import useLoginStore from '@/stores/login/login'

function usePermissions(permissionId: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item: string) => item.includes(permissionId))
}

export default usePermissions
