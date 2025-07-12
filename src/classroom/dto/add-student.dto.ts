import { IsNumber, IsArray, IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../users/models/user.model';

export class AddStudentDto {
  @ApiProperty({
    description: 'ID do aluno para adicionar à turma',
    example: 1,
  })
  @IsNumber({}, { message: 'ID do aluno deve ser um número' })
  userId: number;
}

export class AddMultipleStudentsDto {
  @ApiProperty({
    description: 'Lista de IDs dos alunos para adicionar à turma',
    example: [1, 2, 3],
  })
  @IsArray({ message: 'userIds deve ser um array' })
  @IsNumber({}, { each: true, message: 'Cada ID deve ser um número' })
  userIds: number[];
}

export class CreateStudentInClassroomDto {
  @ApiProperty({
    description: 'Email do aluno',
    example: 'joao@email.com',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description: 'Nome do aluno',
    example: 'João da Silva',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @ApiProperty({
    description: 'Senha do aluno',
    example: '123456',
  })
  @IsString({ message: 'Senha deve ser uma string' })
  password: string;

  @ApiProperty({
    enum: UserRole,
    description: 'Role do usuário (opcional, default: ALUNO)',
    example: UserRole.STUDENT,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role inválida. Precisa ser ADMIN, ALUNO ou PROFESSOR' })
  role?: UserRole;
} 