import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products/products.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { UsersController } from './controllers/users/users.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { ProductsService } from './services/products/products.service';
import { BrandsService } from './services/brands/brands.service';
import { CategoriesService } from './services/categories/categories.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    UsersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService, BrandsService, CategoriesService, UsersService],
})
export class AppModule {}
