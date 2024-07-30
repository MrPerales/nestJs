import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //no tenemos que preocuparnos por los "/" aunque se puede poner
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo ';
  }
  // nota: puede tener problemas
  // con algunos frameworks por no pkner el "/" al final
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
  @Get('products/filter')
  getProductFilter() {
    return `soy un filter`;
  }

  // rutas con parametros
  @Get('products/:id')
  // agregamos @params en los
  // parametros de la funcion para obtenerlos
  // como sabemos el nombre del parametro lo agregamos directamente
  getPRoduct(@Param('id') id: string) {
    return `product with id= ${id}`;
  }

  @Get('categories/:categoriesId/products/:productsId')
  getCategory(
    @Param('categoriesId') categoriesId: string,
    @Param('productsId') productId: string,
  ) {
    return `product with id= ${productId}, category with id= ${categoriesId}`;
  }

  // query params
  @Get('products')
  getProducts(
    // si no recivimos los paramas podemos poner unos por defecto
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `products limit => ${limit} offset => ${offset} brand => ${brand}`;
  }
}
