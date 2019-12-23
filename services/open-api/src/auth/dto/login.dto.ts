import {ApiModelProperty} from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
} from 'class-validator';

export class LoginDto {
    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    // @IsEmail()
    // @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty(
        {
            minLength: 8,
        },
    )
    // @IsNotEmpty()
    // @IsString()
    readonly password: string;
}
