import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return 'list Brands';
  }

  @Get(':id')
  getBrand(@Param('id', ParseIntPipe) id: number) {
    return `brand id => ${id} `;
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
