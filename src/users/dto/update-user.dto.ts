import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    admin_id?: number;
    company_id?: number
    password?: string
}
