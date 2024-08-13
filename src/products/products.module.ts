import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// products
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { Product } from './entities/product.entity';
// categories
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Category } from './entities/categories.entity';
// brands
import { BrandsController } from './controllers/brands/brands.controller';
import { BrandsService } from './services/brands/brands.service';
import { Brand } from './entities/brands.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
