// Core
import {
  Res,
  Body,
  Post,
  HttpCode,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import crypto from 'crypto';
// Dto
import { AuthDto } from './dto/authentication.dto';
// Services
import { UserService } from 'src/user/user.service';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() body: AuthDto, @Res() res): Promise<any> {
    if (!body.email || !body.password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('Missing email or password.');
    }

    const user = await this.userService.findOne({
      where: {
        email: body.email,
        password: crypto.createHmac('sha256', body.password).digest('hex'),
      },
    });

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send('No user found with this email and password.');
    }

    const result = this.authenticationService.createToken(user.email);

    return res.json(result);
  }
}
