interface Amount {
  amount: string,
  billingFrequency: string,
  periodStart: number
}
export interface Product {
  description: string,
  name: string,
  price: Amount[],
  isSelected:boolean
}
export interface ProductCategories {
  name: string,
  products: Product[]
}