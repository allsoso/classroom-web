import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video } from './models/video.model';
import { Classroom } from '../../classroom/models/classroom.model';
import { ClassroomContent } from '../../classroom/models/classroom-content.model';
import { SequelizeModule } from '@nestjs/sequelize';  

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [SequelizeModule.forFeature([Video, Classroom, ClassroomContent])],
})
export class VideoModule {}
