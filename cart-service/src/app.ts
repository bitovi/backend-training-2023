/* eslint-disable no-restricted-syntax */
import fastify from 'fastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4'
import { PrismaClient } from '@prisma/client'

const { calculateCartTotal } = require('./util')

const PORT = Number(process.env?.APP_PORT) || 3000

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

app.get('/cart/:cartId', async(req: any, res: any) => {
  const cart = await prisma.cart.findUnique({
    where: {
      cartid: req.params.cartId
    }
  })

  try {
    const { taxes, total, subtotal } = await calculateCartTotal(cart)
    res.send({
      ...cart,
      subtotal,
      taxes,
      total
    })
  } catch (error: any) {
    res.send({ error: error.message })
  }
})

app.post('/cart', async(req: any, res: any) => {
  res.send({ cartId: uuid() })
})

app.post('/cart/add', async(req: any, res: any) => {
  const { cartId, productId, quantity } = req.body

  try {
    // Look up existing cart, so we can add products
    const cart = await prisma.cart.findUnique({
      where: {
        cartid: cartId
      }
    })

    // Update the cart
    const productsMap = [...((cart?.products as Array<any>) || []), {
      productId,
      quantity
    }]
    const updatedCart = await prisma.cart.upsert({
      where: {
        cartid: cartId
      },
      create: {
        cartid: cartId,
        products: productsMap
      },
      update: {
        cartid: cartId,
        products: productsMap
      }
    })

    const { taxes, total, subtotal } = await calculateCartTotal(updatedCart)
    res.send({
      ...updatedCart,
      subtotal,
      taxes,
      total
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
