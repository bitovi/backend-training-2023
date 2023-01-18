import fastify from 'fastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4'
import { PrismaClient } from '@prisma/client'

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
  res.send(cart)
})

app.post('/cart', async(req: any, res: any) => {
  res.send({ cartId: uuid() })
})

app.post('/cart/add', async(req: any, res: any) => {
  const { cartId, productId, quantity, price } = req.body
  const cart = await prisma.cart.findUnique({
    where: {
      cartid: cartId
    }
  })
  const products = [...((cart?.products as Array<any>) || []), { productId, quantity, price }]
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

app.listen({ port: 3000 }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Listening on ${address}`)
})
