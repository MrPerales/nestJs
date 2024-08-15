import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from 'src/products/entities/brands.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}
  // metodos
  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: Brand['id']) {
    const brand = await this.brandRepo.findOneBy({ id });
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found `);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = this.brandRepo.create(payload);
    return this.brandRepo.save(newBrand);
  }

  async update(id: Brand['id'], payload: UpdateBrandDto) {
    const brand = await this.findOne(id);
    if (brand) {
      this.brandRepo.merge(brand, payload);
      return this.brandRepo.save(brand);
    }
    return null;
  }

  async delete(id: Brand['id']) {
    const brand = await this.findOne(id);
    if (brand) {
      this.brandRepo.delete(id);
      return { message: 'deleted', brand };
    }
    return null;
  }
}
