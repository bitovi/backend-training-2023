FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY src src

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build dist dist
COPY --from=build node_modules node_modules

CMD node dist/app.js
