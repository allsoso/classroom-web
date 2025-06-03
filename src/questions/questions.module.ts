import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './models/question.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Content } from '../contents/models/content.model';

@Module({
  imports: [SequelizeModule.forFeature([Question, Content])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
