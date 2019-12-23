import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import {getSwaggerDocs} from "./config/swagger.config";
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  getSwaggerDocs(app);
  app.useGlobalPipes(new ValidationPipe());
  app.use(requestIp.mw());
  await app.listen(process.env.PORT, '0.0.0.0');
  Logger.log(`Open API is listening on port: ${process.env.PORT}`);
}
bootstrap();
