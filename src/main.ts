// Core
import { NestFactory } from '@nestjs/core';
// Packages
import { SwaggerModule } from '@nestjs/swagger';
// Modules
import { AppModule } from './app.module';
// Configs
import { swaggerOptions } from './shared/configs/swagger.config';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000);
};

bootstrap();
