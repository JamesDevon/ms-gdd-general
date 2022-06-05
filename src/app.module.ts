import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mysql} from '../config/Mysql';
import {ProjectModule} from "./project/project.module";
import {MongooseModule} from "@nestjs/mongoose";
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
      TypeOrmModule.forRoot(Mysql.getConfig()),
      MongooseModule.forRoot("mongodb://localhost:27017"),
      AuthModule,
      ProjectModule,
      ProfileModule,
  ],
})
export class AppModule {}
