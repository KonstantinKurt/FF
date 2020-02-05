import {Controller, Logger} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {AuthService} from './auth.service';
import {UserDto} from './dto/user.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @MessagePattern('login')
    async login(loginData: UserDto): Promise<object> {
        return this.authService.login(loginData);
    }

    @MessagePattern('register')
    async register(registerData: UserDto): Promise<object> {
        return this.authService.register(registerData);
    }

    @MessagePattern('check_email')
    async checkEmail(email: string): Promise<object> {
        return this.authService.checkEmail(email);
    }
}
