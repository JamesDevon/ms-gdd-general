import {Body, Controller, HttpCode, Post} from '@nestjs/common';
import {AuthCredentialsDto} from "./dto/auth-credentials.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/signUp')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signIn')
    @HttpCode(200)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto) : Promise<{ accessToken }> {
        return this.authService.signIn(authCredentialsDto);
    }

}
