import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { MicroserviceOptions } from '@nestjs/common/interfaces/microservices/microservice-configuration.interface';
import { Transport } from '@nestjs/common/enums/transport.enum';

export const msOptions: NestMicroserviceOptions & MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
        host: '127.0.0.1',
        port: +process.env.PORT,
    },
};
