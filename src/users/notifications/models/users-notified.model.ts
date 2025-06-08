import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from '../../models/user.model';
import { Notification } from './notification.model';

@Table({
    tableName: 'users_notified',
    timestamps: false
})
export class UserNotified extends Model<UserNotified> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'id_user'
    })
    declare id_user: number;

    @ForeignKey(() => Notification)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'id_notification'
    })
    declare id_notification: number;
} 