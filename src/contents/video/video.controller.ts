import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, Res, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';

const multerConfig = {
  storage: diskStorage({
    destination: './src/contents/data',
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const extension = path.extname(file.originalname);
      cb(null, `video_${timestamp}${extension}`);
    },
  }),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/flv', 'video/webm'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não suportado. Use apenas arquivos de vídeo.'), false);
    }
  },
};

@Controller('contents/video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('videoFile', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        classroom_id: { type: 'number' },
        videoFile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(@Body() createVideoDto: CreateVideoDto, @UploadedFile() videoFile: Express.Multer.File) {
    return this.videoService.create(createVideoDto, videoFile);
  }

  @Get('stream/:filename')
  async streamVideo(@Param('filename') filename: string, @Res() res: Response) {
    const dataDir = path.join(process.cwd(), 'src/contents/data');
    const filePath = path.join(dataDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Vídeo não encontrado');
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = res.req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
  }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get('files')
  findAllFiles() {
    return this.videoService.findAllVideos();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.remove(+id);
  }

  @Delete('file/:filename')
  deleteVideo(@Param('filename') filename: string) {
    return this.videoService.deleteVideo(filename);
  }
}
