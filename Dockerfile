FROM node:24-alpine3.22

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]