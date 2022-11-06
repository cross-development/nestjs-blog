// Core
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
// Modules
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
// Middleware
import { AuthenticationMiddleware } from './authentication/middleware/authentication.middleware';
// Configs
import { strategy } from './shared/configs/passport-strategy.config';

@Module({
  imports: [DatabaseModule, AuthenticationModule.forRoot('jwt'), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const userControllerAuthenticatedRoutes = [
      { path: '/users', method: RequestMethod.GET },
      { path: '/users/:id', method: RequestMethod.GET },
      { path: '/users/:id', method: RequestMethod.PUT },
      { path: '/users/:id', method: RequestMethod.DELETE },
    ];

    consumer
      .apply(AuthenticationMiddleware)
      .with(strategy)
      .forRoutes(...userControllerAuthenticatedRoutes);
  }
}
