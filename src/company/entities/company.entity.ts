import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({tableName: 'companies'})
export class Company extends Model {
    @Column({primaryKey: true, autoIncrement: true})
    id: number;

    @Column
    name: string;

    @HasMany(() => User)
    users: User[]
}
