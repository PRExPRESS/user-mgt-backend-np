import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Admin, Company])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
