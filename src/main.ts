import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // activar pipe
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist quita del payload todos los atributos que no esten en el DTO
      whitelist: true,
      // manda una advertencia de atributos extra que no esten en el DTO
      forbidNonWhitelisted: true,
      transformOptions: {
        // queryParams transform cadena de caracteres que se represente como numero lo hace number
        enableImplicitConversion: true,
      },
    }),
  );

  //activamos la serializacion
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Api')
    .setDescription('The fakeApi with NestJs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
