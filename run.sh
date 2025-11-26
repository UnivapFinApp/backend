# USE ISSO NA SUA PRIMEIRA INTERAÇÃO COM O SERVIDOR
npx prisma migrate dev --name init
# USE ISSO NAS INTERAÇÕES SEGUINTES
# npx prisma migrate deploy
node dist/main
