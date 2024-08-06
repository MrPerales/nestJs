import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  // forma segura de inyectar un valor que queremos
  //  que se use atra ves de toda la app
  getHello(): string {
    console.log(this.tasks);
    return `Hello World! ${this.apikey}`;
  }
}
