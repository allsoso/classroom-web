import { ApiProperty } from '@nestjs/swagger';

export class ClassroomResponseDto {
  @ApiProperty({
    description: 'ID único da turma',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Código único da turma',
    example: 'TURMA2024A',
  })
  codigo: string;

  @ApiProperty({
    description: 'Nome da turma',
    example: 'Turma de Programação Web 2024',
  })
  nome: string;

  @ApiProperty({
    description: 'Descrição da turma',
    example: 'Turma dedicada ao ensino de programação web com foco em HTML, CSS e JavaScript',
    required: false,
  })
  descricao: string | null;

  @ApiProperty({
    description: 'Data de criação da turma',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização da turma',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;
} 