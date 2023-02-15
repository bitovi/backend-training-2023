import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import Ajv from 'ajv'
import { Static, Type } from '@sinclair/typebox'

const ajv = new Ajv()

const TableName = process.env.TABLE_NAME

const awsConfig = {
  region: process.env.AWS_DEFAULT_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL
}

const dynamoDBClient = new DynamoDBClient(awsConfig)
const lambdaClient = new LambdaClient(awsConfig)

const IngredientSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  cookTime: Type.Number(),
  prepTime: Type.Number()
}, {
  additionalProperties: false
})

const IngredientsSchema = Type.Array(IngredientSchema)

type Ingredient = Static<typeof IngredientSchema>

const validateIngredientsSchema = ajv.compile<Ingredient[]>(IngredientsSchema)

async function getIngredients(): Promise<Ingredient[]> {
  const ingredientsResp = await lambdaClient.send(new InvokeCommand({
    FunctionName: 'ingredients'
  }))

  const ingredients = JSON.parse(
    Buffer.from(ingredientsResp.Payload as Uint8Array).toString()
  )

  return JSON.parse(ingredients.body)
}

function validateIngredients(ingredients: Ingredient[]): void {
  if (validateIngredientsSchema(ingredients)) {
    return
  }

  throw new Error('ingredients invalid')
}

export async function list() {
  const { Items } = await dynamoDBClient.send(new ScanCommand({
    TableName
  }))

  const recipes = Items?.map((item: any) => unmarshall(item))
  const ingredients = await getIngredients()

  validateIngredients(ingredients)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        recipes: recipes?.map((recipe: any) => {
          const ingreds = recipe
            .ingredients
            ?.map((ingredientId: Number) => ingredients.find((ingredient) => ingredient.id === ingredientId))

          return {
            ...recipe,
            ingredients: ingreds,
            cookTime: ingreds.reduce((acc: Number, cur: {cookTime: any}) => (cur.cookTime + acc), 0),
            prepTime: ingreds.reduce((acc: Number, cur: {prepTime: any}) => (cur.prepTime + acc), 0)
          }
        })
      },
      null,
      2
    )
  }
}
