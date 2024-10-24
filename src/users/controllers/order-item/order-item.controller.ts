import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderItemDto } from 'src/users/dtos/order-item.dto';
import { OrderItemService } from 'src/users/services/order-item/order-item.service';

@ApiTags()
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @ApiOperation({ summary: 'create order' })
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }
}
