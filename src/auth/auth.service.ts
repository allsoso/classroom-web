import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as argon from 'argon2';
import { User, UserRole } from '../users/models/user.model';
import { AuthDto, SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private jwt: JwtService,
        private config: ConfigService,
    ){}
    
    async signup(dto: SignupDto){
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.userModel.create({
                email: dto.email,
                hash: hash,
                name: dto.name,
                role: dto.role || UserRole.STUDENT 
            } as any);
            return this.signToken(user.id, user.email);
        } catch (error) {
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }
    
    async signin(dto: AuthDto){
        const user = await this.userModel.findOne({
            where: { email: dto.email }
        });

        if(!user){
            throw new ForbiddenException('Credentials incorrect');
        }
        const pwdMatch = await argon.verify(user.hash, dto.password);
        if(!pwdMatch){
            throw new ForbiddenException('Credentials incorrect');
        }
        return this.signToken(user.id, user.email);
    }

    async signToken(
        userid: number,
        email: string,
    ): Promise<{ access_token: string }>{
        const payload = {
            sub: userid,
            email
        };
        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: this.config.get('JWT_SECRET')
            }
        );
        return {
            access_token: token,
        };
    }
}
