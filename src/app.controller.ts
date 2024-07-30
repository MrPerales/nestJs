import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //no tenemos que preocuparnos por los "/" aunque se puede poner
  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo ';
  }
  // nota: puede tener problemas
  // con algunos frameworks por no pkner el "/" al final
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
