import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/services/products/products.service';
import { CreateUserDto, UpdateUserdto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
    private customerService: CustomerService,
    // solo se va a poder usar gracias al modulo global
    private configService: ConfigService,
  ) {}

  fndAll() {
    // examples
    // const apikey = this.configService.get('API_KEY');
    // const dataname = this.configService.get('DATABASE_NAME');
    // console.log('apikey:', apikey);
    // console.log('DATABASENAME:', dataname);
    return this.userRepo.find({
      relations: ['customer'],
    });
  }
  async findOne(id: User['id']) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`user #${id} not found `);
    }
    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = this.userRepo.create(payload);
    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: User['id'], payload: UpdateUserdto) {
    const user = await this.findOne(id);
    if (user) {
      this.userRepo.merge(user, payload);
      return this.userRepo.save(user);
    }
    return null;
  }

  async delete(id: User['id']) {
    const user = await this.findOne(id);
    if (user) {
      this.userRepo.delete(id);
      return { message: 'deleted', body: { user } };
    }
    return null;
  }

  async getOrdersByUser(id: User['id']) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
