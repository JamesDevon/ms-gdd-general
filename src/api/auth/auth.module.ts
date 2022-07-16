import { Module } from '@nestjs/common';
import { AuthService } from 'src/api/auth/auth.service';
import { AuthController } from 'src/api/auth/auth.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "src/api/auth/entities/users/users.repository";
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from "@nestjs/jwt";
import { JwtStrategy } from 'src/api/auth/utils/jwt.strategy';

@Module({
  imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
        secret: 'secret',
        signOptions: {
          expiresIn: '1h',
        },
      }),
      TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
