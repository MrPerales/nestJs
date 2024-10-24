import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from 'src/users/dtos/order-item.dto';
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

  @ApiOperation({ summary: 'update order' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.orderItemService.update(id, payload);
  }

  @ApiOperation({ summary: 'delete order' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.delete(id);
  }
}
