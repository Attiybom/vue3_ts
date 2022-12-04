import { ref } from 'vue'
import type PageContent from '@/components/page-content/PageContent.vue'

function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const handleQueryClick = (formData: any) => {
    pageContentRef.value?.fetchPageListData(formData)
  }
  const handleRefreshClick = () => {
    pageContentRef.value?.fetchPageListData()
  }


  return {
    pageContentRef,
    handleQueryClick,
    handleRefreshClick
  }
}

export default usePageContent
