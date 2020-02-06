import {Injectable, Logger} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory} from '@nestjs/microservices';
import {authClientOptions} from '../config/auth_ms_client.config';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
import {CheckEmailDto} from './dto/check_email.dto';

@Injectable()
export class AuthService {
    private authClient: ClientProxy;
    private logger = new Logger('Open Api');

    constructor() {
        this.authClient = ClientProxyFactory.create(authClientOptions);
    }

    async login(loginData: LoginDto) {
       return this.authClient.send('login', loginData);
    }

    async register(registerData: RegisterDto) {
        this.logger.log(`Passing register data ${JSON.stringify(registerData)}`);
        return this.authClient.send('register', registerData);
    }

    async checkEmail(emailData: CheckEmailDto) {
        this.logger.log(`Checking email: ${JSON.stringify(emailData)}`);
        return this.authClient.send('check_email', emailData.email);
    }
}
