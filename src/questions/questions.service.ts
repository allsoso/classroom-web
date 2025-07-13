import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './models/question.model';
import { InjectModel } from '@nestjs/sequelize';
import { QuestionResponseDto } from './dto/question-response.dto';
import { Content } from '../contents/models/content.model';
import { User } from '../users/models/user.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
    @InjectModel(Content)
    private contentModel: typeof Content,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  private mapToResponseDto(question: Question): QuestionResponseDto {
    return {
      id: question.id,
      question: question.question,
      answer: question.answer,
      type: question.type,
      private: question.private,
      content_position: question.content_position,
      id_content: question.id_content,
      id_parent_question: question.id_parent_question,
      id_created_by: question.id_created_by,
      id_answered_by: question.id_answered_by,
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

  private async verifyUserExists(userId: number): Promise<void> {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<QuestionResponseDto> {
    if (createQuestionDto.id_content) {
      await this.verifyContentExists(createQuestionDto.id_content);
    }
    
    if (createQuestionDto.id_created_by) {
      await this.verifyUserExists(createQuestionDto.id_created_by);
    }
    
    if (createQuestionDto.id_answered_by) {
      await this.verifyUserExists(createQuestionDto.id_answered_by);
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
    
    if (updateQuestionDto.id_created_by) {
      await this.verifyUserExists(updateQuestionDto.id_created_by);
    }
    
    if (updateQuestionDto.id_answered_by) {
      await this.verifyUserExists(updateQuestionDto.id_answered_by);
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

  async findByContent(contentId: number): Promise<QuestionResponseDto[]> {
    await this.verifyContentExists(contentId);
    
    const questions = await this.questionModel.findAll({
      where: { id_content: contentId },
      order: [['createdAt', 'ASC']]
    });
    
    return questions.map(question => this.mapToResponseDto(question));
  }

  async updateAnswer(id: number, updateAnswerDto: { answer: string; id_answered_by?: number }): Promise<QuestionResponseDto> {
    const question = await this.questionModel.findByPk(id);
    if (!question) {
      throw new NotFoundException(`Pergunta com ID ${id} não encontrada`);
    }
    
    if (updateAnswerDto.id_answered_by) {
      await this.verifyUserExists(updateAnswerDto.id_answered_by);
    }
    
    await this.questionModel.update({ 
      answer: updateAnswerDto.answer,
      id_answered_by: updateAnswerDto.id_answered_by 
    }, { where: { id } });
    const updatedQuestion = await this.questionModel.findByPk(id);
    if (!updatedQuestion) {
      throw new NotFoundException(`Pergunta com ID ${id} não encontrada`);
    }
    return this.mapToResponseDto(updatedQuestion);
  }
}