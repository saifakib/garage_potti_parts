import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './zod-validation/zod-validation.filter';
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './config/swagger.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  // Swagger
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, swaggerDocument);
  
  app.useGlobalFilters(new ZodFilter());
  await app.listen(3000, () => {
    Logger.log('Listening at http://localhost:' + 3000 + '/' + globalPrefix);
  });
}
bootstrap();
