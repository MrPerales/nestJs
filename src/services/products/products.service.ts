import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'bla bla',
      price: 123,
      stock: 1,
      image: 'fdifdjifj',
    },
  ];

  findAll() {
    return this.products;
  }
  findOne(id: Product['id']) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`product #${id} not found `);
    }
    return product;
  }
  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: Product['id'], payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = {
        ...product,
        ...payload,
        id,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: Product['id']) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`product #${id} not found `);
    }
    this.products.splice(index, 1);
    return { message: 'deleted' };
  }
}
