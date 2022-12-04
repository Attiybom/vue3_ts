import { ref } from 'vue'
import type PageModal from '@/components/page-modal/PageModal.vue'

function usePageModal() {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const handleCreateClick = () => {
    pageModalRef.value?.openModal()
  }
  const handleUpdateClick = (data: any) => {
    pageModalRef.value?.openModal(false, data)
  }

  return {
    pageModalRef,
    handleCreateClick,
    handleUpdateClick
  }
}

export default usePageModal
