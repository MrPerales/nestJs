import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { BrandsService } from 'src/products/services/brands/brands.service';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @ApiOperation({ summary: 'List of Brands' })
  @Get()
  getBrands() {
    return this.brandService.findAll();
  }
  @ApiOperation({ summary: 'Get a Brand' })
  @Get(':id')
  getBrand(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a Brand' })
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandService.create(payload);
  }

  @ApiOperation({ summary: 'Update a Brand' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a Brand' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandService.delete(id);
  }
}
