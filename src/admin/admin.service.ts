import { Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AdminService {

  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin,
  ) {}
  async create(createAdminDto: Omit<CreateAdminDto, 'id'>) {
    const password = createAdminDto.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.adminModel.create({ ...createAdminDto, password: hashedPassword });
  }

  //login validator

  async findByEmail(email: string,): Promise<Admin | null> {
    const user = await this.adminModel.findOne({ where: { email } });
    
    return user;
  }


  findAll(): Promise<Admin[]> {
    
    return this.adminModel.findAll();
  }

  findOne(id: number): Promise<Admin> {
    const admin = this.adminModel.findByPk(id);
    return admin;

  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return  this.adminModel.update(updateAdminDto, {where: {id}});
  }

  remove(id: number) {
    this.adminModel.destroy({where: {id}});
    return `This action removes a #${id} admin`;
  }
}
