// Core
import { Module } from '@nestjs/common';
// Services
import { UserService } from './user.service';
// Controllers
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [userProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
