import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const TableName = process.env.TABLE_NAME

const dbClient = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL
})

export async function list() {
  const { Items } = await dbClient.send(new ScanCommand({
    TableName
  }))

  return {
    statusCode: 200,
    body: JSON.stringify(Items?.map((item) => unmarshall(item)), null, 2)
  }
}
