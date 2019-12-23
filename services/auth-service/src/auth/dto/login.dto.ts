import {
    IsString,
    IsNotEmpty,
    IsEmail, Length,
} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @Length(8)
    readonly password: string;
}
