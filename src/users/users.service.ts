import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Op } from 'sequelize';


interface UserWith{
  users: User[],
  total: number
}

@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(
      @InjectModel(User)
      private userModel: typeof User,
      @InjectModel(Company) private companyModel: typeof Company,
    ) {}
  async create(createUserDto: CreateUserDto[]):Promise<string> {
    
    const usersWithTimestamps = createUserDto.map((user) => ({
      ...user,
      createdAt: new Date(),  
      updatedAt: new Date(),
    }))
    await this.userModel.bulkCreate(usersWithTimestamps);
    return 'User created successfully';
  }

  async findAll(id: number, page: number = 1, limit: number = 10, searchTerm: string = ''): Promise<any> {
    
    const offset = (page - 1) * limit;
    
    // Count the total 
    const totalUsers = await this.userModel.count({
      where: { 
        admin_id: id ,

        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ]
      },
    });
  
    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / limit);
  
    
    const users = await this.userModel.findAll({
      where: { admin_id: id,
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerm}%` } },
          { email: { [Op.like]: `%${searchTerm}%` } },
        ] 

      },
      include: [
        {
          association: 'admin',
          model: Admin,
          as: 'admin',
          attributes: ['name', 'email', 'phone', 'address'],
          required: true,
        },
        {
          association: 'company',
          model: Company,
          as: 'company',
          attributes: ['name'],
          required: true,
        },
      ],
      limit,    
      offset,   
    });
  
    
    return {
      users,         
      totalUsers,    
      totalPages,    
      currentPage: page, 
      limit,        
    };
  }
  
  

  findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: { id: id },
      include: [

        {
          association: 'admin',
          model: User,
          as: 'admin',
          required: true
        },
        {
          association: 'company',
          model: Company,
          as: 'company',
          required: true
        },
        
        
      ],
    }); ;
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<[affectedCount: number]> {

    return this.userModel.update(updateUserDto, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const companyId = user.company_id;

    // Delete the user
    await user.destroy();

    
    const userCount = await this.userModel.count({ where: { company_id: companyId } });
    console.log('userCount of company',userCount);
    if (userCount === 0) {
      
      await this.companyModel.destroy({ where: { id: companyId } });
    }
    return this.userModel.destroy({where: {id}});
    
  }
}
