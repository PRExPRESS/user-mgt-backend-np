import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('api/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto[]) {
    return this.companyService.create(createCompanyDto);

  }

  
    @Get()
    async findAll
    (
      
      @Query('page') page: string = '1',   
      @Query('limit') limit: string = '10',
      @Query('searchTerm') searchTerm: string = '',
  ) {
      try {
        
        return await this.companyService.findAll( +page, +limit, searchTerm);
        
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get('all')
    async findAllCompanies() {
      
        return await this.companyService.findAllCompanies();
    }
  

  @Get(':id')
  async findOne(@Param('id') id: string) {
    
      const company = await this.companyService.findOne(+id);
      if(company===null){
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      return company;
      
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
