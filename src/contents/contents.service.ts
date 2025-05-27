import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './models/content.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content)
    private contentModel: typeof Content,
  ) {}

  create(createContentDto: CreateContentDto) {
    return this.contentModel.create(createContentDto as any);
  }

  findAll() {
    return this.contentModel.findAll();
  }

  findOne(id: number) {
    return this.contentModel.findByPk(id);
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return this.contentModel.update(updateContentDto, { where: { id } });
  }

  remove(id: number) {
    return this.contentModel.destroy({ where: { id } });
  }
}
