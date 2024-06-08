import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { MealDay } from "src/meal-days/meal-days.model";
import { Ufi } from "src/ufi/ufi.model";
import { User } from "src/users/users.model";
import { MealUfi } from "./meal-ufis.model";
import { MealDayMeals } from "src/meal-days/mealDay-meals.model";
import { MealType } from "./types/meal.types";
import { UserMeals } from "./user-meals.model";

interface MealCreationAttributes {
    title: string
    time: string
    authorId: number
    type: string
}

@Table({ tableName: 'meals'})
export class Meal extends Model<Meal, MealCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор приема пищи'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({ example: '13:40', description: 'Время приема пищи.'})
    @Column({ type: DataType.STRING, allowNull: false})
    time: string

    @ApiProperty({ example: 'Второй завтрак', description: 'Название приёма пищи.'})
    @Column({ type: DataType.STRING, allowNull: false })
    type: MealType

    @ApiProperty({ example: 42, description: 'ID автора приёма пищи'})
    @Column({ type: DataType.INTEGER, allowNull: false })
    authorId: number

    //______________СВЯЗИ С ТАБЛИЦАМИ_________________________________________________

    @BelongsToMany(() => Ufi, () => MealUfi)
    ufis: Ufi[]

    @BelongsToMany(() => MealDay, () => MealDayMeals)
    mealDays: MealDay[]

    @BelongsToMany(() => User, () => UserMeals)
    users: User[]
}