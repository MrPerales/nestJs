import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserdto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'List of Users' })
  @Get()
  getUsers() {
    return this.userService.fndAll();
  }

  @ApiOperation({ summary: 'Get a User' })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a User' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }
  @ApiOperation({ summary: 'Update a User' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserdto,
  ) {
    return this.userService.update(id, payload);
  }
  @ApiOperation({ summary: 'Delete a User' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOrdersByUser(id);
  }
}
