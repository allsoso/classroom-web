import { BelongsToMany, Column, DataType, Model, PrimaryKey, AutoIncrement, Default, Table, HasMany, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import { Question } from "../../questions/models/question.model";
import { Classroom } from "../../classroom/models/classroom.model";
import { ClassroomContent } from "../../classroom/models/classroom-content.model";

export enum ContentType {
    VIDEO = 'VIDEO',
    PDF = 'PDF',
}

@Table({
  tableName: 'contents',
  paranoid:true
})
export class Content extends Model<Content> {
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
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.ENUM(...Object.values(ContentType)),
    allowNull: false,
  })
  type: ContentType;

  @HasMany(() => Question)
  questions: Question[];

  @BelongsToMany(() => Classroom, () => ClassroomContent)
  classrooms: Classroom[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @DeletedAt
  declare deletedAt: Date;
}
