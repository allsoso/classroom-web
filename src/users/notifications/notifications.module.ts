import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';
import { User } from '../models/user.model';
import { UserNotified } from './models/users-notified.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Notification, User, UserNotified])
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
