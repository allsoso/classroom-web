import { AutoIncrement, Column, CreatedAt, DataType, Default, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

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
  @Default(DataType.INTEGER)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
  })
  role: UserRole;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
