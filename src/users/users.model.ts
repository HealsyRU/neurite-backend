import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { MealDay } from "src/meal-days/meal-days.model";
import { UserMealDays } from "src/meal-days/user-mealDays.model";
import { Meal } from "src/meals/meals.model";
import { UserMeals } from "src/meals/user-meals.model";
import { Role } from "src/roles/roles.model";
import { UserRole } from "src/roles/user-roles.model";
import { Token } from "src/tokens/tokens.model";
import { Ufi } from "src/ufi/ufi.model";
import { UserUfi } from "src/ufi/user-ufis.model";

interface UserCreationAttributes {
    email: string
    password: string
    activationLink: string
    isActivated: boolean
}

@Table({ tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор аккаунта'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({ example: 'example@email.ru', description: 'Основной почтовый ящик при регистрации'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @ApiProperty({ example: '123456', description: 'Текущий пароль аккаунта'})
    @Column({ type: DataType.STRING, allowNull: false})
    password: string

    @ApiProperty({ example: true, description: 'Индикатор активированности аккаунта'})
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    isActivated: boolean

    @ApiProperty({ example: 'example.com/asiXSj6892_34', description: 'Ссылка активации'})
    @Column({ type: DataType.STRING, defaultValue: 'null'})
    activationLink: string

    //Имеет многие ROLE, которые также могут быть у многих USER.
    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]

    //Имеет многие UFI, которые также могут быть у многих USER
    @BelongsToMany(() => Ufi, () => UserUfi)
    ufis: Ufi[]

    @BelongsToMany(() => Meal, () => UserMeals)
    meals: Meal[]

    @BelongsToMany(() => MealDay, () => UserMealDays)
    mealDays: MealDay[]

    @HasOne(() => Token)
    token: Token
}