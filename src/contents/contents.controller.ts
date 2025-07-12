import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ContentsService } from './contents.service';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Get('content/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.contentsService.findOne(id);
  }

  @Delete('content/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.contentsService.remove(id);
  }
}
