import { Injectable } from '@nestjs/common';
import { Content } from './models/content.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content)
    private contentModel: typeof Content,
  ) {}

  findAll() {
    return this.contentModel.findAll();
  }

  findOne(id: number) {
    return this.contentModel.findByPk(id);
  }

  remove(id: number) {
    return this.contentModel.destroy({ where: { id } });
  }
}
