/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const PRODUCT_URL = process.env?.PRODUCT_URL || 'http://localhost:3002'

export type HydratedProduct = {
  productId: string
  name: string
  price: number
}

export default class Product {
  private productId: string

  constructor(productId: string) {
    this.productId = productId
  }

  async checkAvailability(): Promise<boolean> {
    const productResp = await fetch(`${PRODUCT_URL}/products`)
    const products: HydratedProduct[] = await productResp.json()

    for (let product of products) {
      if (product.productId === this.productId) {
        return true
      }
    }
    return false
  }

  async getPrice(): Promise<number> {
    const productResp = await fetch(`${PRODUCT_URL}/products`)
    const products: HydratedProduct[] = await productResp.json()
    const productIndex = products.findIndex(product => product.productId === this.productId)
    return products[productIndex].price
  }

  async getHydratedData(): Promise<HydratedProduct> {
    const productResp = await fetch(`${PRODUCT_URL}/products`)
    const products: HydratedProduct[] = await productResp.json()
    const productIndex = products.findIndex(product => product.productId === this.productId)
    return products[productIndex]
  }
}
