import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto[]) {
    try {
      //console.log(createUserDto);
      return await this.usersService.create(createUserDto);
      
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll
  (
    @Query('admin') admin_id: number,
    @Query('page') page: string = '1',   
    @Query('limit') limit: string = '10',
    @Query('searchTerm') searchTerm: string = '',
) {
    try {
      console.log(admin_id, page, limit);
      return await this.usersService.findAll(admin_id, +page, +limit, searchTerm);
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    
      const user = await this.usersService.findOne(+id);
      console.log(user);
      if(user===null){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
      
    
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.findOne(+id);
      if(user===null){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);        
      }
      
      if(updateUserDto.password){
        const password = updateUserDto.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.usersService.update(+id, {...updateUserDto, password: hashedPassword});
      }
      return await this.usersService.update(+id, updateUserDto);
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(+id);
      if(user===null){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);        
      }
      return await this.usersService.remove(+id);
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
