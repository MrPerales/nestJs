import { Module, Global } from '@nestjs/common';
import * as mysql from 'mysql2';
// const mysql = require('mysql2');

const API_KEY = '123456789';
const API_KEY_PROD = 'PROD123456';

const pool = mysql.createPool({
  host: 'localhost',
  user: '',
  database: '',
  password: '',
});

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
      useValue: pool,
    },
  ],
  // con esto se va a poder utilizar desde cualquier modulo
  // y como es global no necesitamos importalo solo lo injectamos
  // "@Inject('API_KEY')"
  exports: ['API_KEY', 'MYSQL'],
})
export class DatabaseModule {}
