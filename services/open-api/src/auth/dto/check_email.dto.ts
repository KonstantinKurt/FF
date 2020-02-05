import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

export class CheckEmailDto {
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
}
