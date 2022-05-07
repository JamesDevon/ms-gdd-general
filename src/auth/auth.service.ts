import {Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersRepository} from "../models/users/users.repository";
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(private usersRepository :UsersRepository, private jwtService : JwtService) {

    }

    async signUp(authCredentialsDto: AuthCredentialsDto) : Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken }> {
        const {username, password} = authCredentialsDto;
        const user = await this.usersRepository.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {username};
            const accessToken : string = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new UnauthorizedException("Wrong credentials");
        }
    }

}
