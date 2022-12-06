import requestInstance from '@/services'

export function getGoodsAmoutList() {
  return requestInstance.get(`/goods/amount/list`)
}
