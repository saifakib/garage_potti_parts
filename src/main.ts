import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './zod-validation/zod-validation.filter';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { Logger } from '@nestjs/common';
import { Config } from './config/env.config';
import cookieParser from 'cookie-parser';
import { LoggerInterceptor } from './interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  // Swagger
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDocument);

  app.useGlobalFilters(new ZodFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  const PORT = Config.PORT || 8080;
  await app.listen(PORT, () => {
    Logger.log(`Listening at http://localhost:${PORT}/${globalPrefix}`);
  });
}
bootstrap();
