import { Injectable } from '@nestjs/common';
import {User} from "src/api/auth/entities/users/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ProfileService {

    constructor(@InjectRepository(User) private usersRepository : Repository<User>) {

    }

    async getDetails(id: string) : Promise<User> {
        return this.usersRepository.findOne({where: {id: id}});
    }

}
