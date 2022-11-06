import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async resolve(strategy: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      return passport.authenticate(strategy, async (...args: any[]) => {
        const [, payload, err] = args;

        if (err) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .send('Unable to authenticate the user.');
        }

        const user = await this.userService.findOne({
          there: { email: payload.email },
        });

        req.user = user;

        return next();
      })(req, res, next);
    };
  }

  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error('Method not implemented.');
  }
}
