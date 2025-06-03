import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../models/user.model";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@email.com',
    })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João da Silva',
    })
    @IsString({ message: 'Nome deve ser uma string' })
    name: string;

    @ApiProperty({
        enum: UserRole,
        description: 'Role do usuário',
        example: UserRole.STUDENT,
    })
    @IsEnum(UserRole, { message: 'Role inválida. Precisa ser ADMIN, ALUNO ou PROFESSOR' })
    role: UserRole;
}
