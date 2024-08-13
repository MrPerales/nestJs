import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as mysql from 'mysql2';
import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123456';

@Global()
@Module({
  imports: [
    // servicio orm
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, user, databaseName, password } = configService.mysql;

        return {
          type: 'mysql',
          host,
          username: user,
          password,
          database: databaseName,
          synchronize: true,
        };
      },
    }),
  ],
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
  exports: ['API_KEY', 'MYSQL', TypeOrmModule],
})
export class DatabaseModule {}
