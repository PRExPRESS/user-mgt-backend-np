import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Company,User])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
