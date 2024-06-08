import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Ufi } from "./ufi.model";

@Table({ tableName: 'user_ufis', createdAt: false, updatedAt: false})
export class UserUfi extends Model<UserUfi> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    favorite: boolean

    @ForeignKey(() => Ufi)
    @Column({ type: DataType.INTEGER})
    ufiId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER})
    userId: number
}