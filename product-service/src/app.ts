import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const APP_PORT = Number(process.env?.APP_PORT) || 3000
const server = fastify({ logger: true })

server.get('/', async() => prisma.product.findMany())

type GetParams = {
  id: string
}
server.get('/:id', async(request) => prisma.product.findUnique({
  where: {
    id: Number((request.params as GetParams).id)
  }
}))

server.patch('/:id', async(request: any  ) =>{
  const {stockstatus} = request.body as any
  return prisma.product.update({
    where: {
      id: Number((request.params as GetParams).id)
    },
      data: {
        stockstatus
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
