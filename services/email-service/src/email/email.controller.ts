import {Controller, Logger} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';

@Controller('email')
export class EmailController {

    @MessagePattern( 'confirm_email')
    async confirmEmail(sendEmailData: object) {
        Logger.log(sendEmailData);
        return `Success`;
    }
}
