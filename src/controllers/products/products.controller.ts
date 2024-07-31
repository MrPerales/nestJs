import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

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
    return this.productService.findOne(+id);
  }

  // query params
  @Get()
  getProducts(
    // si no recivimos los paramas podemos poner unos por defecto
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
