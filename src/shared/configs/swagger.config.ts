import { DocumentBuilder } from '@nestjs/swagger';

type SecuritySchemeType = 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

const authAction = {
  name: 'Authorization',
  type: 'http' as SecuritySchemeType,
  description: 'Default',
  in: 'header',
  scheme: 'bearer',
  bearerFormat: 'JWT',
};

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Blog Application')
  .setDescription('APIs for the example blog application.')
  .setVersion('1.0.0')
  .setBasePath('/')
  .addServer('http://')
  .setExternalDoc('For more information', 'http://swagger.io')
  .addTag('blog', 'application purpose')
  .addTag('nestjs', 'framework')
  .addBearerAuth(authAction, 'Authorization')
  .build();
