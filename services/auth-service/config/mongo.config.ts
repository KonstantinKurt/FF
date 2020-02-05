import {MongooseModuleOptions} from '@nestjs/mongoose';

export const mongoOptions: MongooseModuleOptions = {
    useNewUrlParser: true,
    useFindAndModify: true,
    autoReconnect: true,
    useUnifiedTopology: true,
};
