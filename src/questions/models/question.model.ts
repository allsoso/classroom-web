import { Column, Model, PrimaryKey, AutoIncrement, Default, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, Table } from "sequelize-typescript";
import { Content } from "../../contents/models/content.model";

export enum QuestionType {
    COMMENT = 'COMENTARIO',
    QUESTION = 'DUVIDA',
}

@Table({
  tableName: 'questions',
  paranoid: true
})
export class Question extends Model<Question> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  content_position: string;

  @ForeignKey(() => Content)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  id_content: number;

  @BelongsTo(() => Content)
  content: Content;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
