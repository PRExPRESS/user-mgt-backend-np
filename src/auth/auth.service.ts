import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';

import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from 'src/admin/entities/admin.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly adminService: AdminService
    ) { }

    async login(user: any) {

        const {email, password} = user;
        const admin = await this.adminService.findByEmail(email);

        if(!admin){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if(!await bcrypt.compare(password, admin.password)){
            throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
        }


        // Create JWT token
        const payload = { email: user.email, sub: admin.id };
        
        return {
            id: admin.id,
            name: admin.name,
            access_token: this.jwtService.sign(payload),
        };
    }

    // async validateUser(email: string, password: string): Promise<any> {

    //     const user = await this.adminService.findByEmail(email);

    //     if(user && await bcrypt.compare(password, user.password) ){
            
    //         return user;
    //     }
    //     throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);

        
    // }
}
