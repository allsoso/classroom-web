import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../models/question.model';

export class QuestionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  question: string;

  @ApiProperty({ required: false, nullable: true })
  answer: string | null;

  @ApiProperty({ enum: QuestionType })
  type: QuestionType;

  @ApiProperty()
  private: boolean;

  @ApiProperty()
  content_position: string;

  @ApiProperty()
  id_content: number;

  @ApiProperty({ required: false, nullable: true })
  id_parent_question: number | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 