import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const PORT = Number(process.env?.APP_PORT) || 3001

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

app.get('/tax/:product_type', async(req: any, res: any) => {
  const { product_type }: { product_type: string } = req.params

  // eslint-disable-next-line camelcase
  const tax: any = await prisma.$queryRaw`select * from get_tax(${product_type})`
  if (!tax.length) {
    res.code(404).send({ error: 'Tax not found' })
    return
  }
  res.send(tax[0])
})

app.listen({ host: '0.0.0.0', port: PORT }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Tax listening on ${address}`)
})
