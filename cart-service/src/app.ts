/* eslint-disable no-restricted-syntax */
import fastify from 'fastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4'
import { PrismaClient } from '@prisma/client'

const PORT = Number(process.env?.APP_PORT) || 3000
const PRODUCT_URL = process.env?.PRODUCT_URL || 'http://localhost:3002'
const TAX_URL = process.env?.TAX_URL || 'http://localhost:3001'

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

async function* quantityGenerator(quantity: number) {
  let i = 0
  while (i < quantity) {
    // eslint-disable-next-line no-plusplus
    yield i++
  }
}

app.get('/cart/:cartId', async(req: any, res: any) => {
  const cart = await prisma.cart.findUnique({
    where: {
      cartid: req.params.cartId
    }
  })
  res.send(cart)
})

app.post('/cart', async(req: any, res: any) => {
  res.send({ cartId: uuid() })
})

app.post('/cart/add', async(req: any, res: any) => {
  const { cartId, productId, quantity } = req.body

  // Look up product
  app.log.info(`Fetching product ${productId}`)
  const productResp = await fetch(`${PRODUCT_URL}/products/${productId}`)
  if (!productResp.ok) {
    res.send({ error: `No product found for ${productId}` })
    return
  }

  const product = await productResp.json()

  let taxes = 0
  let price = 0
  app.log.info(`Fetching taxes for ${product.type}`)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const _ of quantityGenerator(quantity)) {
    const taxResp = await fetch(`${TAX_URL}/tax/${product.type}`)
    if (!taxResp.ok) {
      res.send({ error: `failed to fetch tax for ${product.type}` })
      return
    }
    const tax = await taxResp.json()
    taxes += (tax.percentage / 100) * product.amount
    price += product.amount
  }

  // Look up existing cart, so we can add products
  const cart = await prisma.cart.findUnique({
    where: {
      cartid: cartId
    }
  })

  // Update the cart
  const products = [...((cart?.products as Array<any>) || []), {
    productId,
    quantity,
    price: product.amount,
    subtotal: price,
    taxes,
    total: price + taxes
  }]
  const updatedCart = await prisma.cart.upsert({
    where: {
      cartid: cartId
    },
    create: {
      cartid: cartId,
      products
    },
    update: {
      cartid: cartId,
      products
    }
  })
  res.send(updatedCart)
})

app.listen({ host: '0.0.0.0', port: PORT }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Cart listening on ${address}`)
})
