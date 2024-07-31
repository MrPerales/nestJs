import { Injectable } from '@nestjs/common';
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
    return this.products.find((item) => item.id === id);
  }
  create(payload: any) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: Product['id'], payload: any) {
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
    this.products.splice(index, 1);

    return { message: 'deleted' };
  }
}
