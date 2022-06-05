import {Body, Controller, Get, HttpCode, Param, Post, UseGuards} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {RegisterCredentialsDto} from "./dto/register-credentials.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/signUp')
    signUp(@Body() registerCredentialsDto: RegisterCredentialsDto) {
        return this.authService.signUp(registerCredentialsDto);
    }

    @Post('/signIn')
    @HttpCode(200)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken, userId }> {
        return this.authService.signIn(authCredentialsDto);
    }

}
