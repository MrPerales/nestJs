import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: Customer['id']) {
    const customer = await this.customerRepo.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(payload);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: Customer['id'], payload: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    if (customer) {
      this.customerRepo.merge(customer, payload);
      return this.customerRepo.save(customer);
    }
    return null;
  }

  async delete(id: Customer['id']) {
    const customer = await this.findOne(id);
    if (customer) {
      this.customerRepo.delete(id);
      return { message: 'deleted', body: { customer } };
    }
    return null;
  }
}
