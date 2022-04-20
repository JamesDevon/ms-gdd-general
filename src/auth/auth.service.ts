import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from "@nestjs/jwt";
import {AuthResponse} from "../models/auth/auth.response";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any): Promise<AuthResponse> {
        const payload = { username: user.username, sub: user.userId};
        return {username: user.username, userId: user.userId, token: this.jwtService.sign(payload)};
    }


}