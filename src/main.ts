import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { seedDatabase } from './helpers/seedDatabase';
import { yamlFileLoader } from './helpers/yamlFileLoader';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { LogService } from './logger/logger.service';
import { AuthGuard } from './resources/auth/auth.guard';

// Temporary fix for BigInt serialization
// https://github.com/expressjs/express/issues/4453
declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this.toString());
};

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Auth
  const jwt = app.get(JwtService);
  const config = app.get(ConfigService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(jwt, config, reflector));

  // Global Logger
  const logger = app.get<LogService>(LogService);
  app.useLogger(logger);

  // Logging interceptor
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  // Exceptions Filter
  const { httpAdapter } = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  // Global Validation
  app.useGlobalPipes(new ValidationPipe());

  // Swagger config
  const document = (await yamlFileLoader('./doc/api.yaml')) as OpenAPIObject;
  SwaggerModule.setup('api', app, document);

  // Seed db
  await seedDatabase();

  await app.listen(PORT);

  process.on('unhandledRejection', () => {
    logger.log('unhandledRejection');
    logger.error('unhandledRejection');
  });

  process.on('uncaughtException', () => {
    logger.log('uncaughtException');
    logger.error('uncaughtException');
  });
}
bootstrap();
