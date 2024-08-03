import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private apikey: string) {}
  // forma segura de inyectar un valor que queremos
  //  que se use atra ves de toda la app
  getHello(): string {
    return `Hello World! ${this.apikey}`;
  }
}
