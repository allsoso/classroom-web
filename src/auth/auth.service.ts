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
        console.log('Signup - Password received:', dto.password);
        const hash = await argon.hash(dto.password);
        console.log('Signup - Hash generated:', hash ? hash.substring(0, 20) + '...' : 'null');
        
        try {
            const user = await this.userModel.create({
                email: dto.email,
                hash: hash,
                name: dto.name,
                role: dto.role || UserRole.STUDENT 
            } as any);
            
            console.log('Signup - User created with hash:', user.hash ? user.hash.substring(0, 20) + '...' : 'null');
            return this.signToken(user.id, user.email);
        } catch (error) {
            console.error('Signup - Error creating user:', error);
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    }
    
    async signin(dto: AuthDto){
        console.log('Signin - Looking for user with email:', dto.email);
        const user = await this.userModel.findOne({
            where: { email: dto.email },
            attributes: ['id', 'email', 'name', 'hash', 'role'] // Especificar explicitamente os atributos
        });

        if(!user){
            console.log('Signin - User not found');
            throw new ForbiddenException('Credentials incorrect');
        }
        
        console.log('Signin - User found with hash:', user.hash ? user.hash.substring(0, 20) + '...' : 'null');
        console.log('Signin - Hash type:', typeof user.hash);
        console.log('Signin - Hash length:', user.hash ? user.hash.length : 0);
        
        if (!user.hash || user.hash.trim() === '') {
            console.log('Signin - Hash is empty or null');
            throw new ForbiddenException('User account not properly configured');
        }
        
        try {
            const pwdMatch = await argon.verify(user.hash, dto.password);
            console.log('Signin - Password verification result:', pwdMatch);
            
            if(!pwdMatch){
                throw new ForbiddenException('Credentials incorrect');
            }
            return this.signToken(user.id, user.email);
        } catch (error) {
            console.error('Signin - Argon2 verification error:', error);
            throw new ForbiddenException('Credentials incorrect');
        }
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
