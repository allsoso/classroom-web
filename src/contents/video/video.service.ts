import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './models/video.model';
import { InjectModel } from '@nestjs/sequelize';
import { ContentType } from '../models/content.model';
import { Classroom } from '../../classroom/models/classroom.model';
import { ClassroomContent } from '../../classroom/models/classroom-content.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video)
    private videoModel: typeof Video,
    @InjectModel(Classroom)
    private classroomModel: typeof Classroom,
    @InjectModel(ClassroomContent)
    private classroomContentModel: typeof ClassroomContent,
  ) {}

  async create(createVideoDto: CreateVideoDto, videoFile?: Express.Multer.File) {
    if (!videoFile) {
      throw new BadRequestException('Arquivo de vídeo é obrigatório');
    }

    const classroomId = parseInt(createVideoDto.classroom_id, 10);
    if (isNaN(classroomId)) {
      throw new BadRequestException('ID da sala de aula deve ser um número válido');
    }

    const classroom = await this.classroomModel.findByPk(classroomId);
    if (!classroom) {
      throw new NotFoundException('Sala de aula não encontrada');
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const videoUrl = `${baseUrl}/contents/video/stream/${videoFile.filename}`;

    const video = await this.videoModel.create({
      title: createVideoDto.title,
      content: createVideoDto.content,
      url: videoUrl,
      type: ContentType.VIDEO
    } as any);

    await this.classroomContentModel.create({
      classroom_id: classroomId,
      content_id: video.id
    } as any);

    const createdVideo = await this.videoModel.findByPk(video.id, {
      include: [
        {
          model: Classroom,
          through: { attributes: [] }
        }
      ]
    });

    if (!createdVideo) {
      throw new NotFoundException('Erro ao criar vídeo');
    }

    return {
      ...createdVideo.toJSON(),
      fileName: videoFile.filename,
      originalName: videoFile.originalname,
      size: videoFile.size,
      mimetype: videoFile.mimetype,
      message: 'Vídeo salvo com sucesso na pasta data e no banco de dados'
    };
  }

  async findAllVideos() {
    const dataDir = path.join(process.cwd(), 'src/contents/data');
    
    if (!fs.existsSync(dataDir)) {
      return [];
    }

    const files = fs.readdirSync(dataDir);
    const videoFiles = files.filter(file => {
      const extension = path.extname(file).toLowerCase();
      return ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'].includes(extension);
    });

    return videoFiles.map(file => {
      const filePath = path.join(dataDir, file);
      const stat = fs.statSync(filePath);
      return {
        fileName: file,
        size: stat.size,
        uploadedAt: stat.birthtime,
        url: `/contents/video/stream/${file}`
      };
    });
  }

  async findAll() {
    return this.videoModel.findAll({
      include: [
        {
          model: Classroom,
          through: { attributes: [] }
        }
      ]
    });
  }

  async findOne(id: number) {
    const video = await this.videoModel.findByPk(id, {
      include: [
        {
          model: Classroom,
          through: { attributes: [] }
        }
      ]
    });

    if (!video) {
      throw new NotFoundException('Vídeo não encontrado');
    }

    return video;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    const video = await this.videoModel.findByPk(id);
    if (!video) {
      throw new NotFoundException('Vídeo não encontrado');
    }

    await this.videoModel.update(updateVideoDto, { where: { id } });
    
    return this.findOne(id);
  }

  async remove(id: number) {
    const video = await this.videoModel.findByPk(id);
    if (!video) {
      throw new NotFoundException('Vídeo não encontrado');
    }

    await this.classroomContentModel.destroy({
      where: { content_id: id }
    });

    await this.videoModel.destroy({ where: { id } });

    return {
      message: 'Vídeo deletado com sucesso do banco de dados'
    };
  }

  async deleteVideo(filename: string) {
    const dataDir = path.join(process.cwd(), 'src/contents/data');
    const filePath = path.join(dataDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Vídeo não encontrado');
    }

    fs.unlinkSync(filePath);
    return {
      message: `Vídeo ${filename} deletado com sucesso`
    };
  }
}
