import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAnswerDto {
    @ApiProperty({
        description: 'Resposta da pergunta',
        example: 'Brasília é a capital do Brasil.',
    })
    @IsString({ message: 'Resposta deve ser uma string' })
    @IsNotEmpty({ message: 'Resposta não pode estar vazia' })
    answer: string;
} 