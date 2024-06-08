import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { MealDay } from "./meal-days.model";

@Table({ tableName: 'user_mealDays', createdAt: false, updatedAt: false})
export class UserMealDays extends Model<UserMealDays> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => MealDay)
    @Column({ type: DataType.INTEGER})
    mealDayId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER})
    userId: number
}