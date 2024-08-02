import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands.dto';
import { Brand } from 'src/entities/brands.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      image: 'url',
      description: 'description brand',
    },
  ];

  // metodos
  findAll() {
    return this.brands;
  }

  findOne(id: Brand['id']) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`product #${id} not found `);
    }
    return brand;
  }
  create(payload: CreateBrandDto) {
    this.counterId += 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
  update(id: Brand['id'], payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...brand,
        ...payload,
        id,
      };
      return this.brands[index];
    }
    return null;
  }

  delete(id: Brand['id']) {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`product #${id} not found `);
    }
    this.brands.splice(index, 1);
  }
}
