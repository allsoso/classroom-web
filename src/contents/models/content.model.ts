import { Column, DataType, Model, PrimaryKey, AutoIncrement, Default, Table } from "sequelize-typescript";

export enum ContentType {
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE',
    TEXT = 'TEXT',
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

}
