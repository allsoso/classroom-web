import { IsEnum, IsString } from "class-validator";
import { ContentType } from "../models/content.model";

export class CreateContentDto {

    @IsString({ message: 'Título deve ser uma string' })
    title: string;

    @IsString({ message: 'Conteúdo deve ser uma string' })
    content: string;

    @IsEnum(ContentType, { message: 'Tipo de conteúdo inválido, precisa ser VIDEO, IMAGE ou TEXT' })
    type: ContentType;
}
