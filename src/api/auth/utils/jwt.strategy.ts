import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersRepository} from "../entities/users/users.repository";
import {User} from "../entities/users/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private usersRepository: UsersRepository){
        super({secretOrKey: 'secret', jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()});
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.usersRepository.findOne({where: {username: username}});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}