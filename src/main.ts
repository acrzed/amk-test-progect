import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('CRM Systems')
    .setDescription('Документация по системе')
    .setVersion('1.0.0')
    .addTag('AZZ feat Nest MongoDB')
    .build()
  const sysDoc = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/doc', app, sysDoc)
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT,
    () => console.log('App - Сервер запущен на порту - ', PORT))

}

start();
