import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apikey: string,
    @Inject('TASKS') private tasks: any[],
    // para tipar las .env
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  // forma segura de inyectar un valor que queremos
  //  que se use atra ves de toda la app
  getHello(): string {
    const apikey = this.configService.apiKey;
    const name = this.configService.database.name;

    return `Hello World! ${apikey} ${name}`;
  }
}
