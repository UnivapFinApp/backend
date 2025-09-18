# CASH

## Como rodar?

1. É necessário preencher os valores no `.env`. Para saber o que completar, verifique o arquivo `.env.template`.
2. Ao preencher esses valores, realize a build da imagem docker e rode o "compose" com o comando: 

```bash
docker compose up -d --build
```

A partir disso, a imagem começará a ser construida e, se tudo foi configurado corretamente, a aplicação será disponibilizada.

## Endpoints

Para descobrir endpoints, o recomendado é utilizar a rota `/docs`