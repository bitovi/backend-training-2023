import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const PORT = Number(process.env?.APP_PORT) || 3001

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

app.get('/tax/:product_type', async(req: any, res: any) => {
  const { product_type }: { product_type: string } = req.params

  const tax = await prisma.tax.findUnique({
    where: {
      product_type
    }
  })

  res.send(tax)
})

app.listen({ host: '0.0.0.0', port: PORT }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Tax listening on ${address}`)
})
