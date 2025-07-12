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
  declare question: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: null,
  })
  declare answer: string;

  @Column({
    type: DataType.ENUM(...Object.values(QuestionType)),
    allowNull: false,
  })
  declare type: QuestionType;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare private: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare content_position: string;

  @ForeignKey(() => Content)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare id_content: number;

  @BelongsTo(() => Content)
  declare content: Content;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null
  })
  declare id_parent_question: number;

  @BelongsTo(() => Question)
  declare parent_question: Question;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
