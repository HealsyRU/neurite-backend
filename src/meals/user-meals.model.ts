import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Meal } from "./meals.model";
import { Ufi } from "src/ufi/ufi.model";
import { User } from "src/users/users.model";

@Table({ tableName: 'user_meals', createdAt: false, updatedAt: false})
export class UserMeals extends Model<UserMeals> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER})
    userId: number

    @ForeignKey(() => Meal)
    @Column({ type: DataType.INTEGER})
    mealId: number
}