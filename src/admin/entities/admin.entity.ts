import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'admins' })
export class Admin extends Model {

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    phone: string;

    

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;

    @HasMany(() => User)
    users: User[]
}
