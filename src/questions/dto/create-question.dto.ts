import { IsBoolean, IsEnum, IsString } from "class-validator";
import { QuestionType } from "../models/question.model";

export class CreateQuestionDto {

    @IsString({ message: 'Pergunta deve ser uma string' })
    question: string;

    @IsEnum(QuestionType, { message: 'Tipo de pergunta inválido, precisa ser COMENTARIO ou DUVIDA' })
    type: QuestionType;

    @IsBoolean({ message: 'Privacidade deve ser um booleano' })
    private: boolean;
}
