import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { QuestionsModule } from './questions/questions.module';
import { ContentsModule } from './contents/contents.module';

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
        models: [User],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    QuestionsModule,
    ContentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
