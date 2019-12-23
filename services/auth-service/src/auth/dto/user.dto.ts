import {
    IsString,
    IsNotEmpty,
    IsEmail, Length,
} from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    readonly password: string;

    @IsString()
    @Length(8)
    readonly ip: string;
}
