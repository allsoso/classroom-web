import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}
    
    @Post('signup')
    signup(@Body() dto: SignupDto){
        return this.authService.signup(dto);
    }
    
    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto);
    }
}
