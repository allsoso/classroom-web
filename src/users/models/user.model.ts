import { AutoIncrement, BelongsToMany, Column, CreatedAt, DataType, Default, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Notification } from '../notifications/models/notification.model';
import { UserNotified } from '../notifications/models/users-notified.model';
import { Classroom } from '../../classroom/models/classroom.model';

export enum UserRole {
  ADMIN = 'ADMIN',
  STUDENT = 'ALUNO',
  INSTRUCTOR = 'PROFESSOR' 
}

@Table({
  tableName: 'users',
  paranoid:true
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare hash: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
  })
  declare role: UserRole;

  @BelongsToMany(() => Notification, () => UserNotified)
  declare notifications: Notification[];

  @ForeignKey(() => Classroom)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare classroom_id: number;

  @BelongsTo(() => Classroom)
  declare classroom: Classroom;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
