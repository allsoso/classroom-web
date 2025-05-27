import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './models/question.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question)
    private questionModel: typeof Question,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionModel.create(createQuestionDto as any);
  }

  findAll() {
    return this.questionModel.findAll();
  }

  findOne(id: number) {
    return this.questionModel.findByPk(id);
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel.update(updateQuestionDto, { where: { id } });
  }

  remove(id: number) {
    return this.questionModel.destroy({ where: { id } });
  }
}