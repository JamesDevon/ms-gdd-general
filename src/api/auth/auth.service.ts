import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersRepository} from "./entities/users/users.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtService} from "@nestjs/jwt";
import {RegisterCredentialsDto} from "./dto/register-credentials.dto";
import {User} from "./entities/users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UsersRepository) private usersRepository : UsersRepository, private jwtService : JwtService) {

    }

    async signUp(registerCredentialsDto: RegisterCredentialsDto) : Promise<void> {
        return this.usersRepository.createUser(registerCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken, userId }> {
        const {username, password} = authCredentialsDto;
        const user: User = await this.usersRepository.findOne({where: {username: username}});
        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {username};
            const accessToken : string = this.jwtService.sign(payload);
            return { accessToken, userId: user.id };
        }
        else {
            throw new UnauthorizedException("Wrong credentials");
        }
    }

}
