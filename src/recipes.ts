import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
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
  prepTime: Type.Number()
}, {
  additionalProperties: false,
  required: ['name']
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

  const allIngredients = await getIngredients()

  validateIngredients(allIngredients)

  const recipes = Items?.map((item) => {
    const recipe = unmarshall(item)
    const ingredients = recipe.ingredients?.map(
      (ingredientId: Number) => allIngredients.find((ingredient) => ingredient.id === ingredientId)
    )
    // sum prepTime
    const totalPrepTime = ingredients.reduce(
      (accumulator:any, ingredient:any) => accumulator + ingredient.prepTime,
      0
    )

    const totalCookTime = recipe.directions.reduce(
      (accumulator:any, step:any) => accumulator + step.cookTime,
      0
    )

    return { ...recipe, totalPrepTime, totalCookTime, ingredients }
  })

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        recipes
      },
      null,
      2
    )
  }
}
