import Fastify, { RequestGenericInterface } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

import { addEvent, getCurrentValue, Event } from './eventSourceLib'

const prisma = new PrismaClient()

const fastify = Fastify({
  logger: true
})

interface requestGeneric extends RequestGenericInterface {
  Params: {
    id: string
  },
  Body: {
    name: string,
    percentage: number
  }
}

interface TaxRule {
  id: number,
  name: string
  percentage: number,
  deleted: boolean
}

const calculators = {
  CreateTaxRule: (cur: TaxRule, event: Event): TaxRule => ({ ...(event.data as TaxRule) }),
  UpdateTaxRule: (cur: TaxRule, event: Event): TaxRule => ({ ...cur, ...event.data }),
  DeleteTaxRule: (cur: TaxRule): TaxRule => ({ ...cur, deleted: true })
}

fastify.get<requestGeneric>('/:id', async(request, reply) => {
  const { id } = request.params
  const record = await prisma.tax_rules.findUnique({
    where: {
      id
    }
  })
  reply.send(record)
})

fastify.post<requestGeneric>('/', async(request, reply) => {
  const { name, percentage } = request.body
  const id = uuidv4()
  const data = { id, name, percentage, type: 'CreateTaxRule' }

  // add event
  const { version } = await addEvent({
    entity: 'TaxRule',
    entity_id: id,
    data
  })

  // get value of read model
  const record = await getCurrentValue<TaxRule>({
    entity: 'TaxRule',
    entity_id: id,
    version,
    calculators
  })

  // console.log({ record })

  // if version is newer than current read model in DB, write it

  reply.send(record)
})

interface NewRecord {
  type: string,
  name?: string
  percentage?: number
}
fastify.patch<requestGeneric>('/:id', async(request, reply) => {
  const { id } = request.params
  const { name, percentage } = request.body
  const data: NewRecord = {
    type: 'UpdateTaxRule'
  }
  if (name) {
    data.name = name
  }
  if (percentage) {
    data.percentage = percentage
  }

  // add event
  const { version } = await addEvent({
    entity: 'TaxRule',
    entity_id: id,
    data
  })

  console.log({ version })

  // get value of read model
  const record = await getCurrentValue<TaxRule>({
    entity: 'TaxRule',
    entity_id: id,
    version,
    calculators
  })

  // if version is newer than current read model in DB, write it

  reply.send(record)
})

fastify.delete<requestGeneric>('/:id', async(request, reply) => {
  const { id } = request.params
  const data = {
    type: 'DeleteTaxRule'
  }
  const record = await addEvent({
    entity: 'TaxRule',
    entity_id: id,
    data
  })
  reply.send(record)
})

const start = async() => fastify.listen({ port: 3000 })

start()
  .catch((err) => {
    fastify.log.error(err)
    process.exit(1)
  })
