import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from './entities/company.entity';
import { Op } from 'sequelize';

@Injectable()
export class CompanyService {
  constructor(
      @InjectModel(Company)
      private companyModel: typeof Company,
    ) {}

  async create(createCompanyDto: CreateCompanyDto[]):Promise<string> {
      
      const usersWithTimestamps = createCompanyDto.map((company) => ({
        ...company,
        createdAt: new Date(),  
        updatedAt: new Date(),
      }))
      await this.companyModel.bulkCreate(usersWithTimestamps);
      return 'company created successfully';
    }

  async findAll( page: number = 1, limit: number = 10, searchTerm: string = ''): Promise<any> {
      
      const offset = (page - 1) * limit;
      
      // Count the total 
      const totalUsers = await this.companyModel.count({
        where: { 
          
  
          [Op.or]: [
            { name: { [Op.like]: `%${searchTerm}%` } },
            
          ]
        },
      });
    
      // Calculate total pages
      const totalPages = Math.ceil(totalUsers / limit);
    
      
      const companies = await this.companyModel.findAll({
        where: { 
          [Op.or]: [
            { name: { [Op.like]: `%${searchTerm}%` } },
            
          ] 
  
        },
        
        limit,    
        offset,   
      });
    
      
      return {
        companies,         
        totalUsers,    
        totalPages,    
        currentPage: page, 
        limit,        
      };
    }
  
    findAllCompanies(){
      return this.companyModel.findAll();
    }

  findOne(id: number): Promise<Company> {
    return this.companyModel.findByPk(id);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    const company = this.companyModel.destroy({where: {id}});

    
    return `This action removes a #${id} company`;
  }
}
