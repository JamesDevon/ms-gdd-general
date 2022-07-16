import { Module } from '@nestjs/common';
import { ProfileService } from 'src/api/profile/profile.service';
import { ProfileController } from 'src/api/profile/profile.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersRepository} from "src/api/auth/entities/users/users.repository";
import {AuthModule} from "src/api/auth/auth.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([UsersRepository]),
      AuthModule,
  ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
