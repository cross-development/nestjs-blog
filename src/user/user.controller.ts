// Core
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CheckLoggedInUserGuard } from 'src/authentication/guard/authentication.guard';
// Services
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UserGuards(CheckLoggedInUserGuard)
  public async index(@Req() res) {
    const users = await this.userService.findAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  public async create(@Body() body: any, @Res() res) {
    if (!body || (body && Object.keys(body).length === 0)) {
      throw new HttpException(
        'Missing some information.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    await this.userService.create(body);

    return res.status(HttpStatus.CREATED).send();
  }

  @Get(':id')
  @UserGuards(CheckLoggedInUserGuard)
  public async show(@Param() id: number, @Res() res) {
    if (!id) {
      throw new HttpException('Missing id.', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const user = await this.userService.findById(id);

    return res.status(HttpStatus.OK).json(user);
  }

  @Put(':id')
  @UserGuards(CheckLoggedInUserGuard)
  public async update(@Param() id: number, @Body() body: any, @Res() res) {
    if (!id) {
      throw new HttpException('Missing id.', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.userService.update(id, body);

    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  @UserGuards(CheckLoggedInUserGuard)
  public async delete(@Param() id: number, @Res() res) {
    if (!id) {
      throw new HttpException('Missing id.', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    await this.userService.delete(id);

    return res.status(HttpStatus.OK).send();
  }
}
