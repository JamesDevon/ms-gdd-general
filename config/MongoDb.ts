import {TypeOrmModuleOptions} from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";
import * as dotenv from 'dotenv';

dotenv.config();

export class MongoDb {

    private static readonly config: TypeOrmModuleOptions = {
        name: 'mongo',
        type: 'mongodb',
        host: process.env.MONGO_ADDRESS,
        port: Number(process.env.MONGO_PORT),
        username: process.env.MONGO_USER,
        password: process.env.MONGOPASSWORD,
        database: process.env.MONGO_DB,
        autoLoadEntities: true,
        synchronize: true,
    };


    public static getConfig() {
        return this.config;
    }
}
