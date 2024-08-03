import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products/products.service';
import { CreateUserDto, UpdateUserdto } from 'src/users/dtos/users.dto';
import { Order } from 'src/users/entities/order.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Name',
      lastName: 'LastName',
      nickname: 'ElName',
      password: 'password',
      image: 'adhdsio',
      mail: 'sdakd@mail.com',
    },
  ];
  fndAll() {
    return this.users;
  }
  findOne(id: User['id']) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`user #${id} not found `);
    }
    return user;
  }
  create(payload: CreateUserDto) {
    this.counterId += 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }
  update(id: User['id'], payload: UpdateUserdto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...payload,
        id,
      };
      return this.users[index];
    }
    return null;
  }
  delete(id: User['id']) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`user #${id} not found `);
    }
    this.users.splice(index, 1);
    return { message: 'deleted' };
  }

  getOrdersByUser(id: User['id']): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
