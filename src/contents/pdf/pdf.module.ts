import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Pdf } from './models/pdf.model';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
  imports: [SequelizeModule.forFeature([Pdf])],
})
export class PdfModule {}
