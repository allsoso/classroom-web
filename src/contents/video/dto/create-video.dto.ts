import { IsString } from "class-validator";

export class CreateVideoDto {
    @IsString({ message: 'Título deve ser uma string' })
    title: string;

    @IsString({ message: 'URL deve ser uma string' })
    url: string;
}
