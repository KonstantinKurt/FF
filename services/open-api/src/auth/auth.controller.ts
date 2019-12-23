import {Body, Controller, Logger, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOperation,
    ApiResponse,
    ApiNotFoundResponse, ApiBearerAuth, ApiUseTags,
} from '@nestjs/swagger';
import {LoginDto} from "./dto/login.dto";

@ApiUseTags('Auth Controller')
@Controller(process.env.OPEN_API_AUTH_URL)
export class AuthController {
    constructor(
      private readonly authService: AuthService,
    ){}

    @Post('/login')
    @ApiOperation({title: ''})
    async login(@Body() loginData: LoginDto){
        return this.authService.login(loginData);
    }


}
