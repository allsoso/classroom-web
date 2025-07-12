import { AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Classroom } from './classroom.model';
import { Content } from '../../contents/models/content.model';

@Table({
    tableName: 'classroom_content',
    timestamps: false
})
export class ClassroomContent extends Model<ClassroomContent> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number;

    @ForeignKey(() => Classroom)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'classroom_id'
    })
    declare classroom_id: number;

    @ForeignKey(() => Content)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'content_id'
    })
    declare content_id: number;
} 