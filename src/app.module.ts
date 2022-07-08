import { Module } from '@nestjs/common';
import { AuthModule } from './api/auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mysql} from '../config/Mysql';
import {ProjectModule} from "./api/project/project.module";
import {MongooseModule} from "@nestjs/mongoose";
import { ProfileModule } from './api/profile/profile.module';
import {EditorModule} from "./websockets/editor/editor.module";


@Module({
  imports: [
      TypeOrmModule.forRoot(Mysql.getConfig()),
      MongooseModule.forRoot("mongodb://localhost:27017"),
      AuthModule,
      ProjectModule,
      ProfileModule,
      EditorModule,
  ]
})
export class AppModule {}
