import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as mysql from 'mysql2';
import config from 'src/config';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123456';

@Global()
@Module({
  providers: [
    {
      // otra forma de injectar servicios o valores
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      // otra forma de injectar servicios o valores
      provide: 'MYSQL',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, databaseName, password, host } = configService.mysql;
        const pool = mysql.createPool({
          host,
          user,
          database: databaseName,
          password,
        });
        return pool;
      },
      inject: [config.KEY],
    },
  ],
  // con esto se va a poder utilizar desde cualquier modulo
  // y como es global no necesitamos importalo solo lo injectamos
  // "@Inject('API_KEY')"
  exports: ['API_KEY', 'MYSQL'],
})
export class DatabaseModule {}
