import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// users
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/users.entity';
// customers
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { Customer } from './entities/customer.entity';

// modules
import { ProductsModule } from 'src/products/products.module';
// Orders
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders/orders.service';
import { OrdersController } from './controllers/orders/orders.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  controllers: [UsersController, CustomerController, OrdersController],
  providers: [UsersService, CustomerService, OrdersService],
})
export class UsersModule {}
