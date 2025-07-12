import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassroomDto {
    @ApiProperty({
        description: 'Código único da turma',
        example: 'TURMA2024A',
    })
    @IsString({ message: 'Código deve ser uma string' })
    codigo: string;

    @ApiProperty({
        description: 'Nome da turma',
        example: 'Turma de Programação Web 2024',
    })
    @IsString({ message: 'Nome deve ser uma string' })
    nome: string;

    @ApiProperty({
        description: 'Descrição da turma',
        example: 'Turma dedicada ao ensino de programação web com foco em HTML, CSS e JavaScript',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Descrição deve ser uma string' })
    descricao?: string;
}
