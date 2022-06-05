import { Injectable } from '@nestjs/common';
import {UsersRepository} from "../auth/entities/users/users.repository";
import {User} from "../auth/entities/users/user.entity";

@Injectable()
export class ProfileService {

    constructor(private usersRepository : UsersRepository) {

    }

    async getDetails(id: string) : Promise<User> {
        return this.usersRepository.findOne({id});
    }

}
