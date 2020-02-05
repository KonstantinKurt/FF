import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
} from '@nestjs/common';
import {AuthService} from './auth.service';

import {
    ApiOperation,
    ApiUseTags,

} from '@nestjs/swagger';
import {LoginDto} from './dto/login.dto';
import {IpAddressCheck} from './decorators/check_ip.decorator';
import {RegisterDto} from './dto/register.dto';
import {CheckEmailDto} from './dto/check_email.dto';
import {Observable} from 'rxjs';

@ApiUseTags('Auth Controller')
@Controller(process.env.OPEN_API_AUTH_URL)
export class AuthController {
    private logger = new Logger('Open-API Auth-controller');
    constructor(
      private readonly authService: AuthService,
    ) {}

    @Post('/login')
    @ApiOperation({title: 'login user'})
    @HttpCode(200)
    login(@Body() loginData: LoginDto,  @IpAddressCheck() ip: string) {
        this.logger.log(loginData);
        loginData.ip = ip;
        return this.authService.login(loginData);
    }

    @Post('/register')
    @ApiOperation({title: 'register user'})
    @HttpCode(201)
    register(@Body() registerData: RegisterDto, @IpAddressCheck() ip: string) {
        registerData.ip = ip;
        return this.authService.register(registerData);
    }

    @Post('/check-email')
    @ApiOperation({title: 'check email validator'})
    @HttpCode(200)
    async checkEmail(@Body() emailData: CheckEmailDto) {
        return this.authService.checkEmail(emailData);
    }

}
