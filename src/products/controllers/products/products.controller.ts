import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { ProductsService } from 'src/products/services/products/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('filter')
  getProductFilter() {
    return `soy un filter`;
  }

  // rutas con parametros
  @ApiOperation({ summary: 'Get a Product' })
  @Get(':id')
  // agregamos @params en los
  // parametros de la funcion para obtenerlos
  // como sabemos el nombre del parametro lo agregamos directamente
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // query params
  @ApiOperation({ summary: 'List of Products' })
  @Get()
  getProducts(
    // si no recivimos los paramas podemos poner unos por defecto
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productService.findAll();
  }

  // @ApiOperation({ summary: 'Create a Product' })
  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   return this.productService.create(payload);
  // }

  // @ApiOperation({ summary: 'Update a Product' })
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateProductDto,
  // ) {
  //   return this.productService.update(id, payload);
  // }
  // @ApiOperation({ summary: 'Delete a Product' })
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.productService.delete(id);
  // }
}
