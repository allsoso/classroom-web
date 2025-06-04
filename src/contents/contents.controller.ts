import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentsService } from './contents.service';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentsService.remove(+id);
  }
}
