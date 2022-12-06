import { defineStore } from 'pinia'
import { getGoodsAmoutList } from '@/services/main/analysis/analysis'
import type { IAnalysisState } from './type'

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    goodsAmountList: []
  }),
  actions: {
    async fetchGoodsAmoutAction() {
      const amountListRes = await getGoodsAmoutList()
      this.goodsAmountList = amountListRes.data

      return amountListRes
    }
  }
})

export default useAnalysisStore
