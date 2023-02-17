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


## Working example after implementation
```bash
curl --location --request PATCH 'http://localhost:8080/loans/8f6231c5-24fb-4793-92ba-81d5cfce774d' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status": "approved",
    "interest_rate_uuid": "97d9edc3-34bf-4832-bc3d-76b9c867472c"
}'
```
