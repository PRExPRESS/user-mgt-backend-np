import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AdminService } from 'src/admin/admin.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from 'src/admin/admin.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET  ,  
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },  
    }),
    AdminModule
  ],
  providers: [ AuthService,JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
