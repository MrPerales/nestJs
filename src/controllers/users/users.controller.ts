import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  Post,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'list User',
    });

    // ('List users');
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      msg: `User id:${id}`,
    });
  }
  @Post()
  create(@Body() payload: any, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      msg: 'create',
      payload,
    });
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      id,
      msg: 'updated',
    });
  }

  @Delete('id')
  delete(@Param('id', ParseIntPipe) id: number, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      id,
      msg: 'deleted',
    });
  }
}
