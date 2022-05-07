import {EntityRepository, Repository} from 'typeorm'
import * as bcrypt from 'bcrypt';
import {User} from "./user.entity";
import {AuthCredentialsDto} from "../../auth/dto/auth-credentials.dto";
import {ConflictException, InternalServerErrorException} from "@nestjs/common";
import {DatabaseEnums} from '../../enums/database.enums';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({username, password: hashedPassword});
        try{
            await this.save(user);
        }catch(error){
            if (error.errno === DatabaseEnums.ER_DUP_ENTRY) {
                throw new ConflictException('Username already exists');
            }else {
                throw new InternalServerErrorException();
            }
        }
    }

}