import {IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional} from 'class-validator';
import { UserRole } from '../../users/models/user.model';

export class AuthDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
