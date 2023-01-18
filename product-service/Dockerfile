FROM node:18-buster AS build

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY src src
COPY tsconfig.json tsconfig.json

RUN npm run build

FROM node:18-buster

WORKDIR /usr/src/app

RUN apt update && apt -y install postgresql-client

COPY --from=build /usr/src/app/dist dist
COPY --from=build /usr/src/app/node_modules node_modules
COPY db db

CMD node dist/app.js
