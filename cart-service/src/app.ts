/* eslint-disable no-restricted-syntax */
import fastify from 'fastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4'
import { PrismaClient } from '@prisma/client'

import { checkProductAvailability, calculatePriceForProducts, hydrateProducts } from './utils'

const PORT = Number(process.env?.APP_PORT) || 3000

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

app.post('/cart', async(req: any, res: any) => {
  res.send({ cartId: uuid() })
})

app.get('/cart/:cartId', async(req: any, res: any) => {
  return prisma.cart.findUnique({
    where: {
      cartId: req.params.cartId
    }
  })
})

app.post('/cart/add', async(req: any, res: any) => {
  const { cartId, productId, quantity } = req.body

  try {
    const cartEntry = await prisma.cart.findUnique({
      where: {
        cartId
      }
    })

    const isAvailable = await checkProductAvailability(productId)
    if (!isAvailable) {
      throw new Error(`Product not found with productId ${productId}`)
    }

    const products = cartEntry?.products
    ? [
      ...(cartEntry.products as string[]),
      productId
    ]
    : [
      productId
    ]

    const updatedCart = await prisma.cart.upsert({
      where: {
        cartId
      },
      create: {
        cartId,
        products
      },
      update: {
        cartId,
        products
      }
    })

    res.send({
      cartId,
      price: await calculatePriceForProducts(products),
      products: await hydrateProducts(products)
    })
  } catch (error) {
    res.send(error)
  }
})

app.listen({ host: '0.0.0.0', port: PORT }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Cart listening on ${address}`)
})
