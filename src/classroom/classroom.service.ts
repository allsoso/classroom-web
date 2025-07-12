import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { AddStudentDto, AddMultipleStudentsDto, CreateStudentInClassroomDto } from './dto/add-student.dto';
import { Classroom } from './models/classroom.model';
import { User, UserRole } from '../users/models/user.model';
import * as argon from 'argon2';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectModel(Classroom)
    private classroomModel: typeof Classroom,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createClassroomDto: CreateClassroomDto) {
    try {
      const classroom = await this.classroomModel.create(createClassroomDto as any);
      return classroom;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ForbiddenException('Código da turma já existe');
      }
      throw error;
    }
  }

  async findAll() {
    return this.classroomModel.findAll();
  }

  async findOne(id: number) {
    const classroom = await this.classroomModel.findByPk(id);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }
    return classroom;
  }

  async getStudents(classroomId: number) {
    const classroom = await this.classroomModel.findByPk(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }

    return this.userModel.findAll({
      where: { 
        classroom_id: classroomId,
        role: 'ALUNO'
      },
      attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
    });
  }

  async addStudent(classroomId: number, addStudentDto: AddStudentDto) {
    const classroom = await this.classroomModel.findByPk(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }

    const user = await this.userModel.findByPk(addStudentDto.userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.role !== 'ALUNO') {
      throw new BadRequestException('Usuário deve ter o role ALUNO para ser adicionado a uma turma');
    }

    if (user.classroom_id) {
      throw new BadRequestException('Usuário já está cadastrado em uma turma');
    }

    await user.update({ classroom_id: classroomId });

    return this.userModel.findByPk(addStudentDto.userId, {
      attributes: ['id', 'name', 'email', 'role', 'classroom_id', 'createdAt', 'updatedAt']
    });
  }

  async addMultipleStudents(classroomId: number, addMultipleStudentsDto: AddMultipleStudentsDto) {
    const classroom = await this.classroomModel.findByPk(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }

    const results: any[] = [];
    const errors: { userId: number; error: string }[] = [];

    for (const userId of addMultipleStudentsDto.userIds) {
      try {
        const result = await this.addStudent(classroomId, { userId });
        results.push(result);
      } catch (error: any) {
        errors.push({
          userId,
          error: error.message
        });
      }
    }

    return {
      success: results,
      errors: errors,
      totalProcessed: addMultipleStudentsDto.userIds.length,
      totalSuccess: results.length,
      totalErrors: errors.length
    };
  }

  async createStudentInClassroom(classroomId: number, createStudentDto: CreateStudentInClassroomDto) {
    const classroom = await this.classroomModel.findByPk(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }

    try {
      const hash = await argon.hash(createStudentDto.password);

      const user = await this.userModel.create({
        email: createStudentDto.email,
        name: createStudentDto.name,
        hash: hash,
        role: createStudentDto.role || 'ALUNO',
        classroom_id: classroomId
      } as any);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        classroom_id: user.classroom_id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ForbiddenException('Email já está sendo usado por outro usuário');
      }
      throw error;
    }
  }

  async removeStudentFromClassroom(classroomId: number, userId: number) {
    const classroom = await this.classroomModel.findByPk(classroomId);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.classroom_id !== classroomId) {
      throw new BadRequestException('Usuário não está cadastrado nesta turma');
    }

    await this.userModel.sequelize?.query(
      'UPDATE users SET classroom_id = NULL WHERE id = ?',
      { replacements: [userId] }
    );

    return {
      message: 'Usuário removido da turma com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        classroom_id: null
      }
    };
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    try {
      const classroom = await this.classroomModel.findByPk(id);
      if (!classroom) {
        throw new NotFoundException('Turma não encontrada');
      }
      
      await classroom.update(updateClassroomDto as any);
      return classroom;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ForbiddenException('Código da turma já existe');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const classroom = await this.classroomModel.findByPk(id);
    if (!classroom) {
      throw new NotFoundException('Turma não encontrada');
    }
    await classroom.destroy();
    return { message: 'Turma removida com sucesso' };
  }
}
