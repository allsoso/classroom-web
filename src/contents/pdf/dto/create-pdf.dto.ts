import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePdfDto {
    @ApiProperty({
        description: 'Título do PDF',
        example: 'Apostila de Programação Web'
    })
    @IsString({ message: 'Título deve ser uma string' })
    title: string;

    @ApiProperty({
        description: 'Descrição ou conteúdo do PDF',
        example: 'Esta apostila cobre os conceitos fundamentais de programação web...'
    })
    @IsString({ message: 'Conteúdo deve ser uma string' })
    content: string;

    @ApiProperty({
        description: 'URL do arquivo PDF',
        example: 'https://storage.googleapis.com/classroom/apostila.pdf'
    })
    @IsString({ message: 'URL deve ser uma string' })
    url: string;
}
