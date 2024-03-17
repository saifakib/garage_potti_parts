import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './zod-validation/zod-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  
  app.useGlobalFilters(new ZodFilter());
  await app.listen(3000);
}
bootstrap();
