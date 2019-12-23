import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

export class RegisterDto {
    @ApiModelProperty()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @ApiModelProperty(
        {
            minLength: 2,
        },
    )
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsString()
    ip: string = "";
}
