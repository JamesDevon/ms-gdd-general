import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import * as dotenv from 'dotenv';
import {User} from "../src/api/auth/entities/users/user.entity";

dotenv.config();

export class Mysql {

    private static readonly config: TypeOrmModuleOptions = {
        type: 'mysql',
        host: process.env.MYSQL_ADDRESS,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        synchronize: true,
        entities: ['dist/**/*.entity.js'],
    };


    public static getConfig() {
        return this.config;
    }
}
