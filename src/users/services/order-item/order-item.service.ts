import { Injectable } from '@nestjs/common';
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
}
