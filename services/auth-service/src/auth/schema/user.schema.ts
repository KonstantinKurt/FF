import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    role: {
        type: String,
        default: 'User',
    },
    ip: {
        type: Array,
        default: [],
    },
    profile: {
      type: String,
    },
}, {
    versionKey: false,
    timestamps: true,
});
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next)  {
    this.password = bcrypt.hashSync(this.password, +process.env.USER_PASSWORD_SALT);
    next();
});
