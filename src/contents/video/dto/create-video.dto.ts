import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateVideoDto {
    @ApiProperty({
        description: 'Título do vídeo',
        example: 'Como criar uma API REST com NestJS'
    })
    @IsString({ message: 'Título deve ser uma string' })
    title: string;

    @ApiProperty({
        description: 'Descrição ou conteúdo do vídeo',
        example: 'Neste vídeo você aprenderá como criar uma API REST completa usando NestJS...'
    })
    @IsString({ message: 'Conteúdo deve ser uma string' })
    content: string;

    @ApiProperty({
        description: 'URL do vídeo',
        example: 'https://www.youtube.com/watch?v=abc123'
    })
    @IsString({ message: 'URL deve ser uma string' })
    url: string;
}
