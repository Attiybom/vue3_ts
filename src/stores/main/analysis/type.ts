export interface IGoodsAmount {
  amount: string
  title: string
  tips: string
  subtitle: string
  number1: number
  number2: number
}

export interface IAnalysisState {
  goodsAmountList: IGoodsAmount[]
  categoryCount: any[]
  categorySale: any[]
  categoryFavor: any[]
}
