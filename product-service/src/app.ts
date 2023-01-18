import fastify from 'fastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client'

const PORT = Number(process.env?.APP_PORT) || 3002

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

app.get('/products', async(req: any, res: any) => {
  const cart = await prisma.product.findMany()
  res.send(cart)
})

app.listen({ port: PORT }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Products listening on ${address}`)
})
