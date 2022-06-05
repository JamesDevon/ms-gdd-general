import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "../auth/entities/users/users.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([UsersRepository]),
      AuthModule,
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
