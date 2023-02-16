import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const APP_PORT = Number(process.env?.APP_PORT) || 3000
const server = fastify({ logger: true })

server.get('/', async() => {
  return prisma.product.findMany()
})

type GetParams = {
  id: string
}
server.get('/:id', async(request) => {
  return prisma.product.findUnique({
    where: {
      id: Number((request.params as GetParams).id)
    }
  })
})

server.patch('/:id', async (request: any) => {
  const id = Number((request.params as GetParams).id);
  const { inStock } = request.body

  return prisma.product.update({
    where: {
      id
    },
    data: {
      inStock
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
