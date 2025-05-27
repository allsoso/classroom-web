import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { Video } from './models/video.model';
import { SequelizeModule } from '@nestjs/sequelize';  

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [SequelizeModule.forFeature([Video])],
})
export class VideoModule {}
