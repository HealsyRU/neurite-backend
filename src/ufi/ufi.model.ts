import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table, } from "sequelize-typescript";
import { MealDay } from "src/meal-days/meal-days.model";
import { Meal } from "src/meals/meals.model";
import { User } from "src/users/users.model";
import { UserUfi } from "./user-ufis.model";
import { MealUfi } from "src/meals/meal-ufis.model";

interface UfiCreationAttributes {
    authorId: number
    type: number
    isFree: boolean
    title: string
    code?: number
    category?: number
    weight?: number
    ccal?: number
    protein?: number
    fat?: number
    carb?: number
    provider?: string
    cost?: number
    description?: string
    favorite?: boolean
    time?: string
    public?: boolean
}

@Table({ tableName: 'ufi'})
export class Ufi extends Model<Ufi, UfiCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор UFI'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    //type: 0-нет типа, 1-готовый продукт магазина, 2-готовое блюдо, 3-ингридиент
    @ApiProperty({ example: 1, description: 'Тип UFI'})
    @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
    type: number

    //Свободен от какого-либо приема пищи
    @ApiProperty({ example: 1, description: 'Свободность от какого-либо приема пищи.'})
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    isFree: boolean

    @ApiProperty({ example: 'Шоколадный круассан', description: 'Название UFI'})
    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @ApiProperty({ example: 110940301, description: 'Код EAN для UFI или иной код'})
    @Column({ type: DataType.INTEGER, allowNull: true })
    code: number

    @ApiProperty({ example: 5, description: 'Категория UFI'})
    @Column({ type: DataType.INTEGER, allowNull: true })
    category: number

    @ApiProperty({ example: 100, description: 'Полная масса UFI, в граммах'})
    @Column({ type: DataType.FLOAT, allowNull: true })
    weight: number

    @ApiProperty({ example: 120, description: 'Килокалорийность (ккал) на 100 грамм UFI'})
    @Column({ type: DataType.FLOAT, allowNull: true })
    ccal: number

    @ApiProperty({ example: 20, description: 'Белков, в граммах, на 100 грамм UFI'})
    @Column({ type: DataType.FLOAT, allowNull: true })
    protein: number

    @ApiProperty({ example: 35, description: 'Жиров, в граммах, на 100 грамм UFI'})
    @Column({ type: DataType.FLOAT, allowNull: true })
    fat: number

    @ApiProperty({ example: 35, description: 'Углеводов, в граммах, на 100 грамм UFI'})
    @Column({ type: DataType.FLOAT, allowNull: true })
    carb: number

    @ApiProperty({ example: 'Пятерочка', description: 'Поставщик/провайдер UFI'})
    @Column({ type: DataType.STRING, allowNull: true })
    provider: string

    @ApiProperty({ example: 80, description: 'Полная текущая стоимость UFI, в рублях'})
    @Column({ type: DataType.FLOAT, allowNull: true })
    cost: number

    @ApiProperty({ example: 'Вкусный круассан', description: 'Описание UFI'})
    @Column({ type: DataType.STRING, allowNull: true })
    description: string

    //Каждая позиция - определенный микронутриент
    //Каждое значение массива - кол-во вещества в определенной единице измерения для этой позиции.

    @ApiProperty({ example: true , description: 'Публичная UFI'})
    @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
    public: boolean

    @ApiProperty({ example: 42, description: 'ID автора ЕПП'})
    @Column({ type: DataType.INTEGER, allowNull: true })
    authorId: number

    //@ApiProperty({ example: true , description: 'Время приёма единицы пищи при необходимости'})
    //@Column({ type: DataType.STRING, allowNull: true })
    //time: string

    //@ForeignKey(() => Meal)
    //@Column({ type: DataType.INTEGER, allowNull: true })
    //mealId: number

    //@BelongsTo(() => Meal)
    //meal: Meal

    //@ForeignKey(() => MealDay)
    //@Column({ type: DataType.INTEGER, allowNull: true })
    //mealDayId: number

    //@BelongsTo(() => MealDay)
    //mealDay: Meal

    //ПРИЧИНА ПИЗДЕЦА? попробовать Сменить на: У одного MealDay может быть много UFI, а у одного mealDay может быть много meals
    @BelongsToMany(() => Meal, () => MealUfi)
    meals: Meal[]

    @BelongsToMany(() => User, () => UserUfi)
    users: User[]
}