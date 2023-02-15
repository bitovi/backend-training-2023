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
