/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
const PRODUCT_URL = process.env?.PRODUCT_URL || 'http://localhost:3002'
const TAX_URL = process.env?.TAX_URL || 'http://localhost:3001'

async function* quantityGenerator(quantity: number) {
  let i = 0
  while (i < quantity) {
    // eslint-disable-next-line no-plusplus
    yield i++
  }
}

async function* productsGenerator(products: any) {
  for (let i = 0; i < products.length; i++) {
    // eslint-disable-next-line no-plusplus
    yield products[i]
  }
}

async function calculateCartTotal(cart: any): Promise<any> {
  // Build response
  const theCart = {
    ...cart,
    taxes: 0,
    subtotal: 0,
    total: 0
  }

  for await (const product of productsGenerator(theCart.products)) {
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
    for await (const _ of quantityGenerator(product.quantity)) {
      const taxResp = await fetch(`${TAX_URL}/tax/${foundProduct.type}`)
      if (!taxResp.ok) {
        throw new Error(`failed to fetch tax for ${foundProduct.type}`)
      }
      const tax = await taxResp.json()

      theCart.taxes += (tax.percentage / 100) * foundProduct.amount
      theCart.subtotal += foundProduct.amount
    }
  }
  theCart.total += theCart.taxes + theCart.subtotal

  return theCart
}

module.exports = {
  calculateCartTotal
}
