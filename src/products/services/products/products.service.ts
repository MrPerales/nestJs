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
  async findOne(id: Product['id']) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`product #${id} not found `);
    }
    return product;
  }
  create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image= payload.image
    // newProduct.description= payload.description ....
    // cambiamos por una sola linea
    // .create crea una instancia pero no guarda en la DB
    const newProduct = this.productRepo.create(payload);
    // .save en DB
    return this.productRepo.save(newProduct);
  }

  async update(id: Product['id'], payload: UpdateProductDto) {
    const product = await this.findOne(id);
    if (product) {
      // update product (producto , cambios )
      this.productRepo.merge(product, payload);
      return this.productRepo.save(product);
    }
    return null;
  }

  async delete(id: Product['id']) {
    const product = await this.findOne(id);
    if (product) {
      this.productRepo.delete(id);
      return { message: 'deleted', product };
    }
    return null;
  }
}
