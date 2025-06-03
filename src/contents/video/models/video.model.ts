import { Content } from "src/contents/models/content.model";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: 'contents',
})
export class Video extends Content {
  @Column({
    type: DataType.STRING,
  })
  url: string;
}
