// Core
import { DynamicModule, Module } from '@nestjs/common';
// Modules
import { UserModule } from 'src/user/user.module';
// Services
import { AuthenticationService } from './authentication.service';
// Controllers
import { AuthenticationController } from './authentication.controller';

@Module({})
export class AuthenticationModule {
  static forRoot(strategy?: 'jwt'): DynamicModule {
    strategy = strategy ? strategy : 'jwt';

    const strategyProvider = {
      provide: 'Strategy',
      useFactory: async (authenticationService: AuthenticationService) => {
        const Strategy = (await import(`./passports/${strategy}.strategy`))
          .default;

        return new Strategy(authenticationService);
      },
      inject: [AuthenticationService],
    };

    return {
      module: AuthenticationModule,
      imports: [UserModule],
      exports: [strategyProvider],
      controllers: [AuthenticationController],
      providers: [AuthenticationService, strategyProvider],
    };
  }
}
