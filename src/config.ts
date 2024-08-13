import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    mysql: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      databaseName: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
    },

    apiKey: process.env.API_KEY,
  };
});
