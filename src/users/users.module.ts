import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
