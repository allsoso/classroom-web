import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAnswerDto {
    @ApiProperty({
        description: 'Resposta da pergunta',
        example: 'Brasília é a capital do Brasil.',
    })
    @IsString({ message: 'Resposta deve ser uma string' })
    @IsNotEmpty({ message: 'Resposta não pode estar vazia' })
    answer: string;

    @ApiProperty({
        description: 'ID do usuário que respondeu a pergunta',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'ID do usuário que respondeu deve ser um número' })
    id_answered_by?: number;
} 