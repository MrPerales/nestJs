import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123456';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // otra forma de injectar servicios o valores
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}
