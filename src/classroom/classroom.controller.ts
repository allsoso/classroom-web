import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { AddStudentDto, AddMultipleStudentsDto, CreateStudentInClassroomDto } from './dto/add-student.dto';
import { ApiBody, ApiResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ClassroomResponseDto } from './dto/classroom-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @ApiBody({ type: CreateClassroomDto })
  @ApiResponse({ type: ClassroomResponseDto })
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  @ApiResponse({ type: [ClassroomResponseDto] })
  findAll() {
    return this.classroomService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: ClassroomResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.findOne(+id);
  }

  @Get(':id/students')
  @ApiResponse({ 
    type: [UserResponseDto],
    description: 'Lista dos alunos cadastrados na turma'
  })
  getStudents(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.getStudents(+id);
  }

  @Post(':id/students')
  @ApiOperation({ summary: 'Adicionar aluno existente à turma' })
  @ApiParam({ name: 'id', description: 'ID da turma' })
  @ApiBody({ type: AddStudentDto })
  @ApiResponse({ 
    type: UserResponseDto,
    description: 'Aluno adicionado à turma com sucesso'
  })
  addStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() addStudentDto: AddStudentDto
  ) {
    return this.classroomService.addStudent(+id, addStudentDto);
  }

  @Post(':id/students/multiple')
  @ApiOperation({ summary: 'Adicionar múltiplos alunos existentes à turma' })
  @ApiParam({ name: 'id', description: 'ID da turma' })
  @ApiBody({ type: AddMultipleStudentsDto })
  @ApiResponse({ 
    description: 'Resultado da operação de adição múltipla'
  })
  addMultipleStudents(
    @Param('id', ParseIntPipe) id: number,
    @Body() addMultipleStudentsDto: AddMultipleStudentsDto
  ) {
    return this.classroomService.addMultipleStudents(+id, addMultipleStudentsDto);
  }

  @Post(':id/students/create')
  @ApiOperation({ summary: 'Criar novo aluno e adicionar à turma' })
  @ApiParam({ name: 'id', description: 'ID da turma' })
  @ApiBody({ type: CreateStudentInClassroomDto })
  @ApiResponse({ 
    type: UserResponseDto,
    description: 'Novo aluno criado e adicionado à turma com sucesso'
  })
  createStudentInClassroom(
    @Param('id', ParseIntPipe) id: number,
    @Body() createStudentDto: CreateStudentInClassroomDto
  ) {
    return this.classroomService.createStudentInClassroom(+id, createStudentDto);
  }

  @Delete(':id/students/:userId')
  @ApiOperation({ summary: 'Remover aluno da turma' })
  @ApiParam({ name: 'id', description: 'ID da turma' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ 
    description: 'Aluno removido da turma com sucesso'
  })
  removeStudentFromClassroom(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number
  ) {
    return this.classroomService.removeStudentFromClassroom(+id, +userId);
  }

  @Patch(':id')
  @ApiResponse({ type: ClassroomResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  @ApiResponse({ type: ClassroomResponseDto })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.classroomService.remove(+id);
  }
}
