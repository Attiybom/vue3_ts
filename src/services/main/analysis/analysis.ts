import requestInstance from '@/services'

export function getGoodsAmoutList() {
  return requestInstance.get(`/goods/amount/list`)
}

export function getGoodsCategoryCount() {
  return requestInstance.get(`/goods/category/count`)
}

export function getGoodsCategorySale() {
  return requestInstance.get(`/goods/category/sale`)
}
export function getGoodsCategoryFavor() {
  return requestInstance.get(`/goods/category/favor`)
}
