import * as mongoose from 'mongoose';

export interface NotificationHash extends mongoose.Document {
    id: string;
    hash: string;
    email: string;
    event: string;
}
