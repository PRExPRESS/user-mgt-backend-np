import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService
) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      
      secretOrKey: process.env.JWT_SECRET ,
    });
  }

  validate(payload: any) {
    
    return { id: payload.sub, email: payload.email };
    
  }
}
