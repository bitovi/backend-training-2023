import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface JSON { [key: string] : any }

export interface Event {
  id: number
  entity: string
  entity_id: string,
  version: number
  data: JSON
}

export const addEvent = async({
  entity,
  entity_id,
  data
}: {
  entity: string,
  entity_id: string,
  data: JSON
}): Promise<Event> => new Promise((resolve) => {
  prisma.$transaction(async(tx: any) => {
    const lastEvent = await tx.event_log.findFirst({
      where: {
        entity,
        entity_id
      },
      orderBy: {
        version: 'desc'
      }
    })

    const nextVersion = lastEvent ? lastEvent.version + 1 : 0

    const event = await prisma.event_log.create({
      data: {
        entity,
        entity_id,
        version: nextVersion,
        data
      }
    })

    resolve(event as Event)
  })
})

export const getCurrentValue = async<T>({
  entity,
  entity_id,
  version,
  calculators
}: {
  entity: string,
  entity_id: string,
  version: number,
  calculators: { [type: string]: (cur: T, e: Event) => T }
}) => Promise<T> {
  const events = await prisma.event_log.findMany({
    where: {
      entity,
      entity_id,
      version: {
        lte: version
      }
    },
    orderBy: {
      version: 'asc'
    }
  })

  type EventData = T & {
    type: string
  }

  return events.reduce((cur: T, event: EventData) => {
    const { type } = (event.data as EventData)
    // console.log({ type })

    return calculators[type](cur, event)
  }, {})
}
