import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './models/question.model';
import { InjectModel } from '@nestjs/sequelize';
import { QuestionResponseDto } from './dto/question-response.dto';
import { Content } from '../contents/models/content.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
    @InjectModel(Content)
    private contentModel: typeof Content,
  ) {}

  private mapToResponseDto(question: Question): QuestionResponseDto {
    return {
      id: question.id,
      question: question.question,
      type: question.type,
      private: question.private,
      content_position: question.content_position,
      id_content: question.id_content,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }

  private async verifyContentExists(contentId: number): Promise<void> {
    const content = await this.contentModel.findByPk(contentId);
    if (!content) {
      throw new NotFoundException(`Conteúdo com ID ${contentId} não encontrado`);
    }
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionResponseDto> {
    if (createQuestionDto.id_content) {
      await this.verifyContentExists(createQuestionDto.id_content);
    }
    const question = await this.questionModel.create(createQuestionDto as any);
    return this.mapToResponseDto(question);
  }

  async findAll(): Promise<QuestionResponseDto[]> {
    const questions = await this.questionModel.findAll();
    return questions.map(question => this.mapToResponseDto(question));
  }

  async findOne(id: number): Promise<QuestionResponseDto> {
    const question = await this.questionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException(`Pergunta com ID ${id} não encontrada`);
    }
    return this.mapToResponseDto(question);
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<QuestionResponseDto> {
      if (updateQuestionDto.id_content) {
      await this.verifyContentExists(updateQuestionDto.id_content);
    }
    await this.questionModel.update(updateQuestionDto, { where: { id } });
    const updatedQuestion = await this.questionModel.findByPk(id);
    if (!updatedQuestion) {
      throw new NotFoundException(`Pergunta com ID ${id} não encontrada`);
    }
    return this.mapToResponseDto(updatedQuestion);
  }

  async remove(id: number): Promise<QuestionResponseDto> {
    const question = await this.questionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException(`Pergunta com ID ${id} não encontrada`);
    }
    await question.destroy();
    return this.mapToResponseDto(question);
  }
}