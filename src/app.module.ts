import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Mysql} from '../config/Mysql';
import {MongoDb} from "../config/MongoDb";


@Module({
  imports: [
      TypeOrmModule.forRoot(Mysql.getConfig()),
      TypeOrmModule.forRoot(MongoDb.getConfig()),
      AuthModule
  ],
})
export class AppModule {}
