
import { Sequelize } from 'sequelize-typescript';

import { Admin } from 'src/admin/entities/admin.entity';


export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        
      });
      sequelize.addModels([Admin]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
