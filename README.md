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

set environment variables

```
source .env
```

deploy the latest code to localstack

```
npm run deploy
```

get a list of recipes

```
curl http://localhost:4566/restapis/<id>/local/_user_request_/recipes
```

Move directions to its own endpoint and make recipes data reference directions by ID
Add CRUD endpoints for recipes, ingredients, and directions
Have two recipes share the same ingredient with different directions
Include a direction with two times like "wait 15 minutes, bake for 25 minutes"