import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dto';
import { Customer } from 'src/users/entities/customer.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: Order['id']) {
    const order = await this.orderRepo.findOne({
      relations: ['items', 'items.product'],
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(payload: CreateOrderDto) {
    // creamos la instancia ya que no tenemos mas atributos que asignar
    const order = new Order();

    if (payload.customerId) {
      const customer = await this.customerRepo.findOneBy({
        id: payload.customerId,
      });
      // creamos una orden relacionada a un cliente
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: Order['id'], changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOneBy({ id });
    if (changes.customerId) {
      // ligar esa orden a otro cliente
      const customer = await this.customerRepo.findOneBy({
        id: changes.customerId,
      });
      console.log(customer);

      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async delete(id: Order['id']) {
    const order = await this.findOne(id);
    if (order) {
      this.orderRepo.delete(id);
      return { message: 'deleted', body: { order } };
    }
    return null;
  }
}
