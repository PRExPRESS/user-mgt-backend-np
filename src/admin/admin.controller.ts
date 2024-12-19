import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';

@Controller('api/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    try {
      const newAdmin = this.adminService.create(createAdminDto);
      if(newAdmin !==null){
        return {message:'User created successfully'}
      }
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.adminService.findOne(+id);
    console.log(user);
    if(user===null){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    try {
      const admin = this.adminService.findOne(+id);
      if(admin===null){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return this.adminService.update(+id, updateAdminDto);
      
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const admin = this.adminService.findOne(+id);
        if(admin===null){
          return new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      return this.adminService.remove(+id);
      
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
