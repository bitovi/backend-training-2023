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

### Specifications

`prepTime` and `cookTime` should be provided per each step of the recipe. The total prep time and cook time can be calculated based on these individual steps. This is a bit more flexible than just providing a single cook time and prep time for the overall recipe as a whole.

### Source of Data

Each step in the recipe should have an associated `cookTime` value and `prepTime` value that reflect approximately how long cook and prep should take

These should be manually associated with each step of the recipe at recipe creation time

#### Backend

- CRUD operations should include `prepTime` and `cookTime` which are an integer value reflecting 'minutes' each is likely to take

- Recommendation is to take the existing `directions` string[] and expand it into an object[] that contains the text, prep time, and cook time. The time values are optional for any given step, some might only have cook time or only prep time.

#### Database

- Recipe schema should be updated to contain two new properties `cookTime` and `prepTime` which are unsigned integers

- Database migration to update `recipe` storage with new fields

#### Frontend

- Should request new fields from the backend and display the cookTime and prepTime to the user
