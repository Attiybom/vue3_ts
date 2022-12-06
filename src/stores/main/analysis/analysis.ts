import { defineStore } from 'pinia'
import {
  getGoodsAmoutList,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor
} from '@/services/main/analysis/analysis'
import type { IAnalysisState } from './type'

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    goodsAmountList: [],
    categoryCount: [],
    categorySale: [],
    categoryFavor: []
  }),
  actions: {
    async fetchGoodsAmoutAction() {
      const amountListRes = await getGoodsAmoutList()
      this.goodsAmountList = amountListRes.data

      return amountListRes
    },
    async fetchCategoryCountAction() {
      const categoryCountRes = await getGoodsCategoryCount()
      this.categoryCount = categoryCountRes.data
    },
    async fetchCategorySaleAction() {
      const categorySaleRes = await getGoodsCategorySale()
      this.categorySale = categorySaleRes.data
    },
    async fetchCategoryFavorAction() {
      const categoryFavorRes = await getGoodsCategoryFavor()
      console.log(categoryFavorRes)

      this.categoryFavor = categoryFavorRes.data
    }
  }
})

export default useAnalysisStore
