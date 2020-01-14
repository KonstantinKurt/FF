import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';
import {mongoOptions} from '../config/mongo.config';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forRoot(`mongodb://localhost:${process.env.MONGO_PORT}/${process.env.DB_NAME}`,
            mongoOptions,
        ),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
