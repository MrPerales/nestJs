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

@Controller('categories')
export class CategoriesController {
  @Get(':categoriesId/products/:productsId')
  getCategory(
    @Param('categoriesId') categoriesId: string,
    @Param('productsId') productId: string,
  ) {
    return `product with id= ${productId}, category with id= ${categoriesId}`;
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
