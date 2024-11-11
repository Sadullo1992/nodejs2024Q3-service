import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { yamlFileLoader } from './helpers/yamlFileLoader';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule);

  // Global Validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger config
  const document = (await yamlFileLoader('./doc/api.yaml')) as OpenAPIObject;
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
