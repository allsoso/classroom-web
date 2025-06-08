import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { QuestionsModule } from './questions/questions.module';
import { ContentsModule } from './contents/contents.module';
import { Content } from './contents/models/content.model';
import { Question } from './questions/models/question.model';
import { VideoModule } from './contents/video/video.module';
import { Video } from './contents/video/models/video.model';
import { AuthModule } from './auth/auth.module';
import { Pdf } from './contents/pdf/models/pdf.model';
import { Notification } from './users/notifications/models/notification.model';
import { UserNotified } from './users/notifications/models/users-notified.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_APP_HOST'),
        port: configService.get('DB_APP_PORT'),
        username: configService.get('DB_APP_USERNAME'),
        password: configService.get('DB_APP_PWD'),
        database: configService.get('DB_APP_DATABASE'),
        models: [User, Content, Question, Video, Pdf, Notification, UserNotified],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    QuestionsModule,
    ContentsModule,
    VideoModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
