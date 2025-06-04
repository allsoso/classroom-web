import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { VideoModule } from './video/video.module';
import { Content } from './models/content.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { PdfModule } from './pdf/pdf.module';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService],
  imports: [VideoModule, SequelizeModule.forFeature([Content]), PdfModule],
})
export class ContentsModule {}
