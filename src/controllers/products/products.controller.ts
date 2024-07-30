import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Res,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  @Get('filter')
  getProductFilter() {
    return `soy un filter`;
  }

  // rutas con parametros
  @Get(':id')
  // agregamos @params en los
  // parametros de la funcion para obtenerlos
  // como sabemos el nombre del parametro lo agregamos directamente
  getProduct(@Param('id') id: string) {
    return `product with id= ${id}`;
  }

  // query params
  @Get()
  getProducts(
    // si no recivimos los paramas podemos poner unos por defecto
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit => ${limit} offset => ${offset} brand => ${brand}`;
  }

  @Post()
  create(@Body() payload: any, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      msg: 'agregado ',
      payload,
    });
  }
  @Put(':id')
  update(@Param('id') id: string, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      id,
      msg: 'updated',
    });
  }

  @Delete('id')
  delete(@Param('id') id: string, @Res() resp: Response) {
    return resp.status(HttpStatus.OK).json({
      id,
      msg: 'deleted',
    });
  }
}
