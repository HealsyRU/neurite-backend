/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  //app.enableCors(
    //{ 
      //origin: true,
      //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      //preflightContinue: false,
      //optionsSuccessStatus: 204,
      //credentials: true
    //}
  //)

  const config = new DocumentBuilder()
  .setTitle('Neurite Life. API Documentation')
  .setDescription('Документация REST API')
  .setVersion('1.0.0')
  .addTag('Neurite.Life')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'http://192.168.31.94:3000', 'http://192.168.31.94:3001', '0.0.0.0', 'http://192.168.31.94/'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })

  await app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
}
start();
