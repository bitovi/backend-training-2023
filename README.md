# Backend Department Training 2023 - Recipes Example

## Usage

install deps

```
npm ci
```

start localstack

```
docker compose up --build
```

deploy the latest code to localstack

```
AWS_ACCESS_KEY_ID=testUser AWS_SECRET_ACCESS_KEY=testAccessKey npm run deploy
```

get a list of recipes

```
curl http://localhost:4566/restapis/<id>/local/_user_request_/recipes
```

## Product Requirements

Provide an estimated prep time and cook time with each recipe.

Current Architecture

- AWS Serverless
- DynomoDB

We have a Recipe and an Ingredient endpoint, which can list the ingredients and recipes. The recipe endpoint will fetch the ingredients for each recipe and then filter them based on the recipe.

## Technical Requirements

- Add prep time to the ingredient schema.
- Add cook time to the ingredient schema.
- When building the recipe, combine the prep time for an estimated prep time.
- When building the recipe, combine the cook time for an estimated cook time.
