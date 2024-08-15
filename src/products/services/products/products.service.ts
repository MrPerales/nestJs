import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }
  findOne(id: Product['id']) {
    const product = this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`product #${id} not found `);
    }
    return product;
  }
  // create(payload: CreateProductDto) {
  //   this.counterId += 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: Product['id'], payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = {
  //       ...product,
  //       ...payload,
  //       id,
  //     };
  //     return this.products[index];
  //   }
  //   return null;
  // }

  // delete(id: Product['id']) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`product #${id} not found `);
  //   }
  //   this.products.splice(index, 1);
  //   return { message: 'deleted' };
  // }
}
