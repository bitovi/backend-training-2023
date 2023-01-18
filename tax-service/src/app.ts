import fastify from 'fastify'
// eslint-disable-next-line import/no-extraneous-dependencies
import { uuid } from 'uuidv4'
import { PrismaClient } from '@prisma/client'

const PORT = Number(process.env?.APP_PORT) || 3001
const { randomNum } = require('./util')

const prisma = new PrismaClient()
const app = fastify({
  logger: true
})

app.post('/tax', async(req: any, res: any) => {
  const { productId }: { productId: string } = req.body

  const tax = await prisma.tax.findUnique({
    where: {
      productid: productId
    }
  })

  if (tax) {
    res.send(tax)
    return
  }

  const createdTax = await prisma.tax.create({
    data: {
      taxid: uuid(),
      productid: productId,
      amount: randomNum(200, 900)
    }
  })
  res.send(createdTax)
})

app.listen({ port: PORT }, (err: any, address: any) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
  console.log(`Tax listening on ${address}`)
})
