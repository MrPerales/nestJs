import { Controller, Get, Param } from '@nestjs/common';

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
}
