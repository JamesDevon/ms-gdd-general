import { Injectable } from '@nestjs/common';
import {UsersRepository} from "src/api/auth/entities/users/users.repository";
import {User} from "src/api/auth/entities/users/user.entity";

@Injectable()
export class ProfileService {

    constructor(private usersRepository : UsersRepository) {

    }

    async getDetails(id: string) : Promise<User> {
        return this.usersRepository.findOne({where: {id: id}});
    }

}
