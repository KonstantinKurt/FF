import {
    HttpException,
    Injectable,
    Logger,
    NotFoundException, OnApplicationBootstrap, UnauthorizedException,
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ClientProxy, ClientProxyFactory} from '@nestjs/microservices';
import {User} from './interface/user.interface';
import {JwtPayload} from './interface/jwt-payload.interface';
import {NotificationHash} from './interface/notification.interface';
import {UserDto} from './dto/user.dto';
import {checkIpInDB} from './helper/check-ip.helper';
import {emailClientOptions} from '../../config/email_ms_client.config';
import {getHash} from './helper/get-hash.helper';
import {SendEmail} from './interface/send-email.interface';
import {Observable} from "rxjs";

@Injectable()
export class AuthService implements OnApplicationBootstrap {
    private logger = new Logger('Auth MS');
    private emailClient: ClientProxy;
    private test = '';

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('NotificationHash') private readonly notificationModel: Model<NotificationHash>,
        private readonly jwtService: JwtService,
    ) {
        this.emailClient = ClientProxyFactory.create(emailClientOptions);
    }

    async onApplicationBootstrap() {
        await this.emailClient.connect();
    }

    async login(loginData: UserDto): Promise<object> {
        this.logger.log(loginData);
        try {
            const user = await this.userModel.findOne({email: loginData.email});
            if (user) {
                const comparePassword = bcrypt.compareSync(loginData.password, user.password);
                if (comparePassword) {
                    if (!checkIpInDB(user, loginData.ip)) {
                        // const cryptIp = getHash(15);
                        // const link = `${process.env.DEV_APP_URL}/Auth/ip/${cryptIp}`;
                        // const newIpUrl = await this.ipUrlRepository.create({hash: cryptIp, user, ip});
                        // newIpUrl.save();
                        // await this.mailerService.sendMail(getNewIpLetter(user, ip, agent, device, link))
                        //     .catch(err => {
                        //         Logger.log(`MAILER ERROR`);
                        //         Logger.log(err);
                        //     });
                    }
                    const payload: JwtPayload = {
                        id: user.id,
                        email: user.email,
                        expires_in: process.env.AUTH_TOKEN_EXPIRES_IN,
                    };
                    const accessToken = await this.jwtService.sign(payload);
                    return {
                        id: payload,
                        access_token: `Bearer ${accessToken}`,
                    };
                } else {
                    throw new UnauthorizedException({
                        message: `Wrong password`,
                    });
                }
            } else {
                throw new NotFoundException({
                    message: `User not found`,
                });
            }
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

    async register(registerData: UserDto): Promise<object> {
        this.logger.log(registerData);
        try {
            const newUser = await new this.userModel({
                email: registerData.email,
                password: registerData.password,
            });
            await newUser.ip.push(registerData.ip);
            await newUser.save();
            const confirmNotificationHash = await new this.notificationModel({
                hash: getHash(15),
                email: newUser.email,
                event: 'confirm email',
            });
            confirmNotificationHash.save();
            const sendEmailData: SendEmail = {
                email: newUser.email,
                hash: confirmNotificationHash.hash,
            };
            return this.sendEmail('confirm_email', sendEmailData);
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

    async checkEmail(email: string): Promise<object> {
        try {
            const check = await this.userModel.findOne({email}).exec();
            return {
                result: !!check,
            };
        } catch (error) {
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }

    sendEmail(pattern: string, data: SendEmail): Observable<object> {
        return this.emailClient.send(pattern, data);
    }
}
