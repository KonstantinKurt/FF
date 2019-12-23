import {Controller, Logger} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {Observable} from "rxjs";
import {JwtPayload} from "./interface/jwt_payload.interface";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    @MessagePattern('login')
    async login(login: LoginDto, ip: string): Promise<object> {
        Logger.log(login);
        Logger.log('Auth MS Controller');
        return this.authService.login(login, ip);
    }
}
