import * as mongoose from 'mongoose';

export const NotificationHashSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    event: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
