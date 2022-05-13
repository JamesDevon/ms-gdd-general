import {getMongoRepository} from "typeorm";
import {MongoRepository} from "typeorm/repository/MongoRepository";
import {Section} from "./section.entity";

export class SectionRepository {

    private repository: MongoRepository<Section>;

    constructor() {
        this.repository = getMongoRepository(Section);
    }
}