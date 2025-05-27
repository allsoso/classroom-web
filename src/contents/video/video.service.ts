import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './models/video.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video)
    private videoModel: typeof Video,
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return this.videoModel.create(createVideoDto as any);
  }

  findAll() {
    return this.videoModel.findAll();
  }

  findOne(id: number) {
    return this.videoModel.findByPk(id);
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.videoModel.update(updateVideoDto, { where: { id } });
  }

  remove(id: number) {
    return this.videoModel.destroy({ where: { id } });
  }
}
