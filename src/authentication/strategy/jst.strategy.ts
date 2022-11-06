// Core
import { Injectable } from '@nestjs/common';
// Packages
import passport from 'passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
// Services
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly authenticationService: AuthenticationService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secret',
      },
      async (req: Request, payload: any, next: VerifiedCallback) => {
        return await this.verify(req, payload, next);
      },
    );

    passport.use(this);
  }

  public async verify(req: Request, payload: any, done: VerifiedCallback) {
    const isValid = await this.authenticationService.validateUser(payload);

    return !isValid ? done('Unauthorized', null) : done(null, payload);
  }
}
