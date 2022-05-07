import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DbConfig} from '../ormconfig';

@Module({
  imports: [ TypeOrmModule.forRoot(DbConfig.getConfig()),
    AuthModule],
})
export class AppModule {}
