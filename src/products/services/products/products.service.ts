import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dto';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/products/entities/categories.entity';
import { Brand } from 'src/products/entities/brands.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }
  async findOne(id: Product['id']) {
    const product = await this.productRepo.findOne({
      relations: ['brand', 'categories'],
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`product #${id} not found `);
    }
    return product;
  }
  async create(payload: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.image= payload.image
    // newProduct.description= payload.description ....
    // cambiamos por una sola linea
    // .create crea una instancia pero no guarda en la DB
    const newProduct = this.productRepo.create(payload);
    // relacionando los ids de brand y category al producto
    if (payload.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: payload.brandId });
      newProduct.brand = brand;
    }
    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        // In para buscar un array en este caso de ids
        id: In(payload.categoriesIds),
      });
      newProduct.categories = categories;
    }
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

  async addCategoryToProduct(
    productId: Product['id'],
    categoryId: Category['id'],
  ) {
    const product = await this.productRepo.findOne({
      relations: ['categories'],
      where: { id: productId },
    });
    // buscamos la category
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    // agregamos la categoria al array
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(
    productId: Product['id'],
    categoryId: Category['id'],
  ) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    console.log(product);

    // quitamos una categoria del array con filter
    const productFilter = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    // guardamos las categorieas ya modificadas
    product.categories = productFilter;
    return this.productRepo.save(product);
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
