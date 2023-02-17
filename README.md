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
curl --location --request GET 'http://localhost:8080/users/3ea2c3c2-ca8f-46bd-bb91-1941bc7fc048' \
--header 'Content-Type: application/json'

curl --location --request PATCH 'http://localhost:8080/loans/8f6231c5-24fb-4793-92ba-81d5cfce774d' \
--header 'Content-Type: application/json' \
--data-raw '{
    "status": "approved",
    "interest_rate_uuid": "79641672-c674-450a-813c-8e37c76ac66b"
}'


Product Requirements:
Restrict whether an interest rate is available for a loan based on the applicant’s credit score 
Don't allow loans to be approved if the interest rate is invalid
