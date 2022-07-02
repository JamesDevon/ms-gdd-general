import {EntityRepository, Repository} from 'typeorm'
import * as bcrypt from 'bcrypt';
import {User} from "./user.entity";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {DatabaseEnums} from '../../../../enums/database.enums';
import {RegisterCredentialsDto} from "../../dto/register-credentials.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(registerCredentialsDto: RegisterCredentialsDto): Promise<void> {
        const {username, email, password} = registerCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password: hashedPassword, email});
        try{
            await this.save(user);
        }catch(error){
            console.error(error);
            if (error.errno === DatabaseEnums.ER_DUP_ENTRY) {
                throw new ConflictException('Username already exists');
            }else {
                throw new InternalServerErrorException();
            }
        }
    }

}