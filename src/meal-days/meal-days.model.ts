import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Meal } from "src/meals/meals.model";
import { Ufi } from "src/ufi/ufi.model";
import { User } from "src/users/users.model";
import { UserMealDays } from "./user-mealDays.model";
import { MealDayMeals } from "./mealDay-meals.model";

interface MealDayCreationAttributes {
    authorId: number
    date: string
    isCompleted: boolean
}

@Table({ tableName: 'meal_days'})
export class MealDay extends Model<MealDay, MealDayCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор дня приема пищи'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({ example: '21.08.2002', description: 'Дата дня приема пищи.'})
    @Column({ type: DataType.STRING, allowNull: false})
    date: string

    @ApiProperty({ example: false, description: 'Выполненность дня приема пищи.'})
    @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false})
    isCompleted: boolean

    //@ForeignKey(() => User)
    //@Column({ type: DataType.INTEGER})
    //userId: number
    @BelongsToMany(() => User, () => UserMealDays)
    users: User[]

    @BelongsToMany(() => Meal, () => MealDayMeals)
    meals: Meal[]

    //ФИКСИТЬ
    //@BelongsTo(() => User)
    //author: User
    @ApiProperty({ example: 42, description: 'ID автора приёма пищи'})
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number
}