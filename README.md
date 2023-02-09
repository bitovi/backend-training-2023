# Backend Department Training 2023 - Recipes Example

## Usage

start localstack

```
docker compose up --build
```

deploy the app to localstack

```
npm deploy
```

get a list of recipes

```
curl http://localhost:4566/restapis/<id>/local/_user_request_/recipes | jq .message
```
