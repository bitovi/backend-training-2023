import Product, { HydratedProduct } from './models/product'

export async function checkProductAvailability(productId: string): Promise<boolean> {
  const product = new Product(productId)
  return product.checkAvailability()
}

export async function calculatePriceForProducts(productIds: string[]): Promise<number> {
  let totalPrice = 0

  for (let productId of productIds) {
    const product = new Product(productId)
    totalPrice += await product.getPrice()
  }

return totalPrice
}

export async function hydrateProducts(productIds: string[]): Promise<HydratedProduct[]> {
  const hydratedProducts: HydratedProduct[] = []

  for (let productId of productIds) {
    const product = new Product(productId)

    hydratedProducts.push(
      await product.getHydratedData()
    )
  }

  return hydratedProducts
}
