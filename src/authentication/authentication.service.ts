// Core
import { Injectable } from '@nestjs/common';
// Packages
import jwt from 'jsonwebtoken';
// Services
import { UserService } from 'src/user/user.service';
// Interfaces and types
import { IUser } from 'src/user/user.interface';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  createToken(email: string, ttl?: number) {
    const expiresIn = ttl || 60 * 60;
    const secretOrKey = 'secret';
    const user = { email };

    const token = jwt.sign(user, secretOrKey, { expiresIn });

    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(payload: IUser): Promise<boolean> {
    const user = await this.userService.findOne({
      where: { email: payload.email },
    });

    return !!user;
  }
}
