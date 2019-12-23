import {
    HttpException,
    Injectable,
    Logger,
    NotFoundException, UnauthorizedException
} from '@nestjs/common';
import {LoginDto} from "./dto/login.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {User} from "./interface/user.interface";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {JwtPayload} from "./interface/jwt_payload.interface";
import {checkIpInDB} from "./helper/check_ip.helper";


@Injectable()
export class AuthService {
    private logger = new Logger('Auth MS');
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
    ){}
    async login(loginData: LoginDto, ip: string): Promise<object>{
        this.logger.log(loginData);
        try{
           const user = await this.userModel.findOne({email: loginData.email});
           if(user){
               const comparePassword = bcrypt.compareSync(loginData.password, user.password);
               if (comparePassword) {
                   if (!checkIpInDB(user, ip)) {
                       // const cryptIp = getHash(15);
                       // const link = `${process.env.DEV_APP_URL}/auth/ip/${cryptIp}`;
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
                       login: user.login,
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
           }else{
               throw new NotFoundException({
                   message: `User not found`
               });
           }
        }catch(error){
            throw new HttpException({
                error: error.message,
            }, 500);
        }
    }
}
