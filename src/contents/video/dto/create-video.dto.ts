import { IsString, IsOptional, IsNumberString } from "class-validator";
import { ApiProperty, ApiConsumes } from "@nestjs/swagger";

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
        description: 'ID da sala de aula à qual o vídeo pertence',
        example: '1'
    })
    @IsNumberString({}, { message: 'ID da sala de aula deve ser um número válido' })
    classroom_id: string;

    @ApiProperty({
        description: 'Arquivo de vídeo',
        type: 'string',
        format: 'binary'
    })
    @IsOptional()
    videoFile?: Express.Multer.File;
}
