import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');


  const config = new DocumentBuilder()
    .setTitle('Financer')
    .setDescription('Financer API endpoints description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('user')
    .build()
  const documentFactory = SwaggerModule.createDocument(app, config);

  app.use('/docs', apiReference({
    content: documentFactory,
    theme: "kepler"
  }))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
