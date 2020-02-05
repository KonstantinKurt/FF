import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger} from '@nestjs/common';
import {msOptions} from '../config/ms_config.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, msOptions);
  await app.listen(() => Logger.log(`Auth-service is listening on port ${process.env.PORT}`));
}
bootstrap();
