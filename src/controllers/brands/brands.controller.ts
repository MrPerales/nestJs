import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return 'list Brands';
  }

  @Get(':id')
  getBrand(@Param('id') id: string) {
    return `brand id => ${id} `;
  }
  @Post()
  create(@Body() payload: any, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      msg: 'create',
      payload,
    });
  }
}
