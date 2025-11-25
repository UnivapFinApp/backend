FROM node:24-alpine3.22 AS base
WORKDIR /usr/app
COPY package.json ./
RUN npm i
COPY run.sh ./

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

COPY --from=builder /usr/app/prisma/schema.prisma ./
COPY --from=builder /usr/app/prisma ./prisma
COPY --from=builder /usr/app/run.sh ./
RUN apk add curl

EXPOSE 3000

CMD [ "sh", "-c", "./run.sh" ]
