import { User } from '../../models/user.model';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsBoolean()
    @IsOptional()
    read?: boolean;

    @IsArray()
    @IsNotEmpty()
    users: User[];
}
