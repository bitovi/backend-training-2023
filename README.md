# Lending Platform Example

## Getting started

`docker compose up --build --detach`

## Create new migration

`./node_modules/.bin/sequelize migration:generate --name="Migration name here"`

## Approve a loan and assign credit rating

```bash
curl --location --request PATCH 'http://localhost:8080/loans/19b75a10-cb68-4df9-83c3-16f752aba227' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status": "approved",
    "interest_rate_uuid": "8629aadb-e65b-4b28-a429-dd74c36ea60e"
}'
```