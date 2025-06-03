import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { QuestionType } from "../models/question.model";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuestionDto {

    @ApiProperty({
        description: 'Pergunta',
        example: 'Qual a capital do Brasil?',
    })
    @IsString({ message: 'Pergunta deve ser uma string' })
    question: string;

    @ApiProperty({
        enum: QuestionType,
        description: 'Tipo de pergunta',
        example: QuestionType.QUESTION,
    })
    @IsEnum(QuestionType, { message: 'Tipo de pergunta inválido, precisa ser COMENTARIO ou DUVIDA' })
    type: QuestionType;

    @ApiProperty({
        description: 'Privacidade da pergunta',
        example: true,
    })
    @IsBoolean({ message: 'Privacidade deve ser um booleano' })
    private: boolean;

    @ApiProperty({
        description: 'Posição do conteúdo que a pergunta se refere.',
        example: '8:10',
    })
    @IsString({ message: 'Posição do conteúdo deve ser uma string' })
    content_position: string;

    @ApiProperty({
        description: 'ID do conteúdo relacionado à pergunta',
        example: 1,
    })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'ID do conteúdo deve ser um número' })
    id_content: number;
}
