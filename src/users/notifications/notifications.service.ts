import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';
import { User } from '../models/user.model';


@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private notificationModel: typeof Notification,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const userIds = createNotificationDto.users.map(user => user.id);
    const foundUsers = await this.userModel.findAll({
      where: {
        id: userIds
      }
    });

    if (foundUsers.length !== userIds.length) {
      const foundUserIds = foundUsers.map(user => user.id);
      const notFoundUserIds = userIds.filter(id => !foundUserIds.includes(id));
      throw new BadRequestException(`Users with IDs ${notFoundUserIds.join(', ')} not found`);
    }

    const notification = await this.notificationModel.create({
      message: createNotificationDto.message,
      read: createNotificationDto.read || false,
    } as Notification);

    await notification.$set('users', userIds);

    return this.notificationModel.findByPk(notification.id, {
      include: [User]
    });
  }

  async findAll() {
    return this.notificationModel.findAll({
      include: [User]
    });
  }

  async findOne(id: number) {
    const notification = await this.notificationModel.findByPk(id, {
      include: [User]
    });
    
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    
    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationModel.findByPk(id);
    
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    if (updateNotificationDto.users) {
      const userIds = updateNotificationDto.users.map(user => user.id);
      const foundUsers = await this.userModel.findAll({
        where: {
          id: userIds
        }
      });

      if (foundUsers.length !== userIds.length) {
        const foundUserIds = foundUsers.map(user => user.id);
        const notFoundUserIds = userIds.filter(id => !foundUserIds.includes(id));
        throw new BadRequestException(`Users with IDs ${notFoundUserIds.join(', ')} not found`);
      }

      await notification.$set('users', userIds);
    }

    await notification.update({
      message: updateNotificationDto.message,
      read: updateNotificationDto.read
    } as Partial<Notification>);

    return this.notificationModel.findByPk(id, {
      include: [User]
    });
  }

  async remove(id: number) {
    const notification = await this.notificationModel.findByPk(id);
    
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    await notification.destroy();
    return notification;
  }
}
