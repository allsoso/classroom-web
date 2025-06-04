import { Injectable } from '@nestjs/common';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { UpdatePdfDto } from './dto/update-pdf.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Pdf } from './models/pdf.model';
import { ContentType } from '../models/content.model';

@Injectable()
export class PdfService {
  constructor(
    @InjectModel(Pdf)
    private pdfModel: typeof Pdf,
  ) {}

  create(createPdfDto: CreatePdfDto) {
    return this.pdfModel.create({
      ...createPdfDto,
      type: ContentType.PDF
    } as any);
  }

  findAll() {
    return this.pdfModel.findAll();
  }

  findOne(id: number) {
    return this.pdfModel.findByPk(id);
  }

  update(id: number, updatePdfDto: UpdatePdfDto) {
    return this.pdfModel.update(updatePdfDto, { where: { id } });
  }

  remove(id: number) {
    return this.pdfModel.destroy({ where: { id } });
  }
}
