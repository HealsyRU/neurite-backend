import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Meal } from "./meals.model";
import { Ufi } from "src/ufi/ufi.model";

@Table({ tableName: 'meal_ufis', createdAt: false, updatedAt: false})
export class MealUfi extends Model<MealUfi> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Ufi)
    @Column({ type: DataType.INTEGER})
    ufiId: number

    @ForeignKey(() => Meal)
    @Column({ type: DataType.INTEGER})
    mealId: number
}