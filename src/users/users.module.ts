import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), NotificationsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
