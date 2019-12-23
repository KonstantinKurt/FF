import {ClientOptions, Transport} from "@nestjs/microservices";

export const authClientOptions: ClientOptions = {
    transport: Transport.TCP,
    options: {
        // host: process.env.AUTH_SERVICE_HOST,
        // port: +process.env.AUTH_SERVICE_PORT,
        host: '127.0.0.1',
        port: 7001,
    }
};
