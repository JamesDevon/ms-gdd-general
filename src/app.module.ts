import { Module } from '@nestjs/common';
import { AuthModule } from 'src/api/auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mysql} from 'config/Mysql';
import {ProjectModule} from "src/api/project/project.module";
import {MongooseModule} from "@nestjs/mongoose";
import { ProfileModule } from 'src/api/profile/profile.module';
import {EditorModule} from "src/websockets/editor/editor.module";
import {MongoDb} from "config/MongoDb";


@Module({
  imports: [
      TypeOrmModule.forRoot(Mysql.getConfig()),
      MongooseModule.forRoot(MongoDb.getConfig().uri),
      AuthModule,
      ProjectModule,
      ProfileModule,
      EditorModule,
  ]
})
export class AppModule {}
