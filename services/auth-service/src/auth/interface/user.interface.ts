import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    id: string;
    password: string;
    email: string;
    ip?: string[];
    role?: string;
    profile?: string;
}
