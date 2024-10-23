import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dto';
import { OrdersService } from 'src/users/services/orders/orders.service';

@ApiTags()
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'all order' })
  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'order' })
  @Get(':id')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @ApiOperation({ summary: 'create order' })
  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @ApiOperation({ summary: 'update a order' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @ApiOperation({ summary: 'delete a Order' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.delete(id);
  }
}
