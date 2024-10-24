import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../../products/entities/product.entity';

import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from 'src/users/dtos/order-item.dto';
import { OrderItem } from 'src/users/entities/order-item.entity';
import { Order } from 'src/users/entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findOne(id: OrderItem['id']) {
    const order = await this.orderItemRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  async create(payload: CreateOrderItemDto) {
    // obtenemos la orden y el producto al que va relacionado
    const order = await this.orderRepo.findOneBy({ id: payload.orderId });
    const product = await this.productRepo.findOneBy({ id: payload.productId });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.orderItemRepo.save(item);
  }

  async update(id: OrderItem['id'], payload: UpdateOrderItemDto) {
    const orderItem = await this.findOne(id);
    console.log(orderItem);

    if (payload.orderId) {
      const order = await this.orderRepo.findOneBy({ id: payload.orderId });
      orderItem.order = order;
    }
    if (payload.productId) {
      const product = await this.productRepo.findOneBy({
        id: payload.productId,
      });
      orderItem.product = product;
    }
    if (payload.quantity) {
      orderItem.quantity = payload.quantity;
    }
    // se puede usar merge pero como ya asignamos todas las propiedades no tiene caso
    // this.orderItemRepo.merge(orderItem, payload);

    return this.orderItemRepo.save(orderItem);
  }

  async delete(id: number) {
    const orderItem = await this.findOne(id);
    if (orderItem) {
      this.orderRepo.delete(id);
      return { message: 'deleted', body: { orderItem } };
    }
    return null;
  }
}
