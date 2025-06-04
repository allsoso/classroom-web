import { Column, DataType, Table } from "sequelize-typescript";
import { Content } from "src/contents/models/content.model";

@Table({
    tableName: 'contents',
})
export class Pdf extends Content{
    @Column({
        type: DataType.STRING,
    })
    url: string;
}
