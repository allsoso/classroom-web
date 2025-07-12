import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { QuestionResponseDto } from './dto/question-response.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ type: QuestionResponseDto })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiResponse({ type: [QuestionResponseDto] })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('content/:contentId')
  @ApiResponse({ type: [QuestionResponseDto] })
  findByContent(@Param('contentId', ParseIntPipe) contentId: number) {
    return this.questionsService.findByContent(contentId);
  }

  @Get(':id')
  @ApiResponse({ type: QuestionResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ type: QuestionResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Patch(':id/answer')
  @ApiBody({ type: UpdateAnswerDto })
  @ApiResponse({ type: QuestionResponseDto })
  updateAnswer(@Param('id', ParseIntPipe) id: number, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.questionsService.updateAnswer(+id, updateAnswerDto.answer);
  }

  @Delete(':id')
  @ApiResponse({ type: QuestionResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(+id);
  }
}
