/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const PRODUCT_URL = process.env?.PRODUCT_URL || 'http://localhost:3002'
const TAX_URL = process.env?.TAX_URL || 'http://localhost:3001'

async function calculateCartTotal(cart: any): Promise<any> {
  // Build response
  let taxes = 0
  let subtotal = 0
  let total = 0
  const cartProducts = cart?.products || []

  for (const product of cartProducts) {
    // Look up product
    console.log('Fetching products')
    const productResp = await fetch(`${PRODUCT_URL}/products`)
    if (!productResp.ok) {
      throw new Error('No products')
    }

    const products = await productResp.json()
    const foundProduct = products.find((p: any) => p.productid === product.productId)

    if (!foundProduct) {
      throw new Error(`No product found for ${product.productId}`)
    }

    console.log(`Fetching taxes for ${foundProduct.type}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let i = 0; i < product.quantity; i++) {
      const taxResp = await fetch(`${TAX_URL}/tax/${foundProduct.type}`)
      if (!taxResp.ok) {
        throw new Error(`failed to fetch tax for ${foundProduct.type}`)
      }
      const tax = await taxResp.json()

      const productAmount = foundProduct.amount
      const taxAmount = (tax.percentage / 100) * productAmount
      taxes += taxAmount
      subtotal += productAmount
      total += taxAmount + productAmount
    }
  }

  return { taxes, subtotal, total }
}

async function checkProductExists(productId: any): Promise<any> {
  // Look up product
  console.log('Fetching product')
  const productResp = await fetch(`${PRODUCT_URL}/products/${productId}`)
  if (!productResp.ok) {
    return false
  }

  return true
}

module.exports = {
  calculateCartTotal,
  checkProductExists
}
