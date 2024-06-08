import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";

@Table({ tableName: 'tokens'})
export class Token extends Model<Token> {

    @ApiProperty({ example: 1, description: 'Refresh-токен аккаунта.'})
    @Column({ type: DataType.STRING(1024), allowNull: false})
    refreshToken: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User
}