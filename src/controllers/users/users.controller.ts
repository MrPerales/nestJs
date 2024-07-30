import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return 'List users';
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return `User id:${id}`;
  }
}
