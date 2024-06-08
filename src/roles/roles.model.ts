import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRole } from "./user-roles.model";

interface RoleCreationAttributes {
    value: string
    description: string
}


@Table({ tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор роли'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({ example: 'ADMIN', description: 'Значение роли'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @ApiProperty({ example: 'Роль администратора', description: 'Описание роли'})
    @Column({ type: DataType.STRING, allowNull: false})
    description: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}