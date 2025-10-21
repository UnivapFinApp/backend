FROM node:24-alpine3.22 AS base
WORKDIR /usr/app
COPY package.json ./
RUN npm i

FROM base AS builder
WORKDIR /usr/app
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine3.22 AS prod
WORKDIR /usr/app
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/generated ./generated

EXPOSE 3000

CMD [ "node", "dist/main" ]
