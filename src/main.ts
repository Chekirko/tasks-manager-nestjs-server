import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
}
bootstrap();
