import { AutoIncrement, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Content } from '../../contents/models/content.model';
import { ClassroomContent } from './classroom-content.model';

@Table({
  tableName: 'classrooms',
  paranoid: true
})
export class Classroom extends Model<Classroom> {
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
    unique: true,
  })
  codigo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nome: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  descricao: string | null;

  @HasMany(() => User)
  users: User[];

  @BelongsToMany(() => Content, () => ClassroomContent)
  contents: Content[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
