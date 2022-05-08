import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";
import {RegisterCredentialsDto} from "./dto/register-credentials.dto";

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
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken }> {
        return this.authService.signIn(authCredentialsDto);
    }

}
