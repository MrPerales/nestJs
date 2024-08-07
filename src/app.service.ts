import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
    private config: ConfigService,
  ) {}
  // forma segura de inyectar un valor que queremos
  //  que se use atra ves de toda la app
  getHello(): string {
    const apikey = this.config.get('API_KEY');
    const name = this.config.get('DATABASE_NAME');

    return `Hello World! ${apikey} ${name}`;
  }
}
