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
  name: Type.String()
}, {
  additionalProperties: false
})

const DirectionSchema = Type.Object({
  id: Type.Number(),
  text: Type.String()
}, {
  additionalProperties: false
})

const IngredientsSchema = Type.Array(IngredientSchema)
const DirectionsSchema = Type.Array(DirectionSchema)

type Ingredient = Static<typeof IngredientSchema>
type Direction = Static<typeof DirectionSchema>

const validateIngredientsSchema = ajv.compile<Ingredient[]>(IngredientsSchema)
const validateDirectionsSchema = ajv.compile<Direction[]>(DirectionsSchema)

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

async function getDirections(): Promise<Direction[]> {
  const directionsResp = await lambdaClient.send(new InvokeCommand({
    FunctionName: 'directions'
  }))

  const directions = JSON.parse(
    Buffer.from(directionsResp.Payload as Uint8Array).toString()
  )

  return JSON.parse(directions.body)
}

function validateDirections(directions: Direction[]): void {
  if (validateDirectionsSchema(directions)) {
    return
  }

  throw new Error('directions invalid')
}

export async function list() {
  const { Items } = await dynamoDBClient.send(new ScanCommand({
    TableName
  }))

  const recipes = Items?.map((item) => unmarshall(item))

  const ingredients = await getIngredients()
  const directions = await getDirections()

  validateIngredients(ingredients)
  validateDirections(directions)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        recipes: recipes?.map((recipe) => ({
          ...recipe,
          directions: recipe
            .directions
            ?.map((directionId: Number) => directions.find((direction) => direction.id === directionId)),
          ingredients: recipe
            .ingredients
            ?.map((ingredientId: Number) => ingredients.find((ingredient) => ingredient.id === ingredientId))
        }))
      },
      null,
      2
    )
  }
}
