import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'

const prisma = new PrismaClient()

const APP_PORT = Number(process.env?.APP_PORT) || 3000
const PRODUCT_SERVICE_URL = process.env?.PRODUCT_SERVICE_URL || 'http://localhost:3001'
const server = fastify({ logger: true })

type GetParams = {
  id: string
}
server.get('/:id', async(request) => {
  const { id } = request.params as GetParams

  return prisma.cart.findUnique({
    where: {
      id
    }
  })
})

server.post('/', async() => prisma.cart.create({
  data: {
    id: uuid(),
    products: []
  }
}))

server.post('/:id', async(request: any) => {
  const { id } = request.params as GetParams
  const { productId, quantity } = request.body

  if (isNaN(Number(quantity)) || Number(quantity) === 0 ) {
    throw new Error('Quantity cannot be zero or invalid')
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id
    }
  })

  const productResp = await fetch(`${PRODUCT_SERVICE_URL}/${productId}`)
  const productDetails = await productResp.json()
  // 
  if (!productDetails) {
    throw new Error('Product does not exist')
  }

  const cartProducts = cart?.products as Array<any> || []
  const existingIndex = cartProducts.findIndex((product: any) => product.id === productId)

  const existingQuantity = existingIndex >= 0 ? cartProducts[existingIndex].quantity : 0
  const newQuantity = existingQuantity + quantity

  if (newQuantity > productDetails.available_quantity) {
    throw new Error(`Quantity not available, only ${productDetails.available_quantity} left`)
  }

  delete productDetails.available_quantity;

  if (existingIndex >= 0) {
    cartProducts[existingIndex].quantity = newQuantity
  } else {
    cartProducts.push({
      ...productDetails,
      quantity
    })
  }

  return prisma.cart.update({
    where: {
      id
    },
    data: {
      products: cartProducts
    }
  })
})

server.listen({ host: '0.0.0.0', port: APP_PORT }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
