
export interface Price {
  amount: string,
  billingFrequency: string,
  periodStart: number
}
export interface Product {
  description: string,
  name: string,
  price: Price[],
  isSelected:boolean
}
export interface ProductCategory {
  name: string,
  products: Product[]
}
