import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  FilterCategoriesDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dto';
import { Category } from 'src/products/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  // metodos
  findAll(params?: FilterCategoriesDto) {
    const { limit, offset } = params;
    return this.categoryRepo.find({ take: limit, skip: offset });
  }

  async findOne(id: Category['id']) {
    const category = await this.categoryRepo.findOne({
      relations: ['products'],
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return category;
  }
  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(payload);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: Category['id'], payload: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (category) {
      // merge
      this.categoryRepo.merge(category, payload);
      return this.categoryRepo.save(category);
    }
    return null;
  }
  async delete(id: Category['id']) {
    const category = await this.findOne(id);
    if (category) {
      this.categoryRepo.delete(id);
      return { message: 'deleted', category };
    }

    return null;
  }
}
