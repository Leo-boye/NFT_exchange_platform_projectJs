import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './common/utils/prisma.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('NFT exchange platform')
    .setDescription(
      'an API used for:\n' +
        '- User management and authentication\n' +
        '- Collections management\n' +
        '- Fake NFT management',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().then();
