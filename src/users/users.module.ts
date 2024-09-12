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

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController, CustomerController],
  providers: [UsersService, CustomerService],
})
export class UsersModule {}
