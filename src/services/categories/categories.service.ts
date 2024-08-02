import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dto';
import { Category } from 'src/entities/categories.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'category 1',
      description: 'category 1',
      image: 'url',
    },
  ];
  // metodos
  findAll() {
    return this.categories;
  }
  findOne(id: Category['id']) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    }
    return category;
  }
  create(payload: CreateCategoryDto) {
    this.counterId += 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  update(id: Category['id'], payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.findIndex((item) => item.id === id);
      this.categories[index] = {
        ...category,
        ...payload,
        id,
      };
      return this.categories[index];
    }
    return null;
  }
  delete(id: Category['id']) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`product #${id} not found `);
    }
    this.categories.splice(index, 1);
    return { message: 'deleted' };
  }
}
