import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../models/user.model";

export class CreateUserDto {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsString({ message: 'Nome deve ser uma string' })
    name: string;

    @IsEnum(UserRole, { message: 'Role inválida. Precisa ser ADMIN, ALUNO ou PROFESSOR' })
    role: UserRole;
}
