import { Column, Model, PrimaryKey, AutoIncrement, Default, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

export enum QuestionType {
    COMMENT = 'COMENTARIO',
    QUESTION = 'DUVIDA',
}

export class Question extends Model<Question> {
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
  question: string;

  @Column({
    type: DataType.ENUM(...Object.values(QuestionType)),
    allowNull: false,
  })
  type: QuestionType;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  private: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

}
