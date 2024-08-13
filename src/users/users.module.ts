import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
// users
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from './entities/users.entity';
// modules
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
