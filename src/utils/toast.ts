import { ElMessage } from 'element-plus'

export function toast(
  message: string = '',
  type: any = 'success',
  duration: number = 3000
) {
  ElMessage({
    message,
    type,
    duration,
    showClose: true
  })
}
