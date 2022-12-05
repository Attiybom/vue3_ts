import { ref } from 'vue'
import type PageModal from '@/components/page-modal/PageModal.vue'

interface ICallback {
  (data?: any): void
}

function usePageModal(createCallback?: ICallback, updateCallback?: ICallback) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleCreateClick = () => {
    pageModalRef.value?.openModal()
    if (createCallback) {
      createCallback()
    }
  }
  const handleUpdateClick = (data: any) => {
    pageModalRef.value?.openModal(false, data)
    if (updateCallback) {
      updateCallback(data)
    }
  }

  return {
    pageModalRef,
    handleCreateClick,
    handleUpdateClick
  }
}

export default usePageModal
