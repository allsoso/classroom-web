import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/users/models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor(
    config: ConfigService,
    @InjectModel(User)
    private userModel: typeof User
  ) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    super({
      jwtFromRequest: 
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }
    async validate(payload: {
      sub: number;
      email: string;
    }) {
      const user = await this.userModel.findByPk(payload.sub);
      if(!user) return null;
      const {hash, ...userWithoutHash} = user.toJSON();
      return userWithoutHash;
    }
}
