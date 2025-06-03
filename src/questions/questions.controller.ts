import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
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

  @Delete(':id')
  @ApiResponse({ type: QuestionResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.remove(+id);
  }
}
