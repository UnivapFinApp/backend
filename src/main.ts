import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');

  const config = new DocumentBuilder()
    .setTitle('Financer')
    .setDescription('Financer API endpoints description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Bearer token for authorization (/v1/api/api/login)',
        in: 'header',
      },
      'JWT',
    )
    .addTag('user')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);

  app.enableCors({
    origin: 'http://localhost',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    '/docs',
    apiReference({
      content: documentFactory,
      theme: 'kepler',
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
