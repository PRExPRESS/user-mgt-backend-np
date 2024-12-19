
import { Table, Column, Model, BelongsTo, ForeignKey,  } from 'sequelize-typescript';
import { Admin } from 'src/admin/entities/admin.entity';
import { Company } from 'src/company/entities/company.entity';


@Table({ tableName: 'users' })
export class User extends Model {
    @Column
    name: string;

    @Column
    email: string;

    @Column
    address: string;

    @Column
    phone: string;

    @ForeignKey(() => Admin)
    @Column
    admin_id: number;

    @ForeignKey(() => Company)
    @Column
    company_id: number;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;


    

    @BelongsTo(() => Admin, { foreignKey: 'admin_id' })
    admin: Admin;

    @BelongsTo(() => Company, { foreignKey: 'company_id' })
    company: Company;
}

