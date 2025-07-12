import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { Classroom } from './models/classroom.model';
import { ClassroomContent } from './models/classroom-content.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Classroom, ClassroomContent, User])],
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}
