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
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dto';
import { CustomerService } from 'src/users/services/customer/customer.service';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @ApiOperation({ summary: 'List of Customers' })
  @Get()
  getCustomers() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'Get a Customer' })
  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a Customer' })
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @ApiOperation({ summary: 'Update a Customer ' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a Customer' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.delete(id);
  }
}
