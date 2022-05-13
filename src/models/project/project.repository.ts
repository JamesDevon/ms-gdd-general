import {getMongoRepository} from "typeorm";
import {Project} from "./project.entity";
import {MongoRepository} from "typeorm/repository/MongoRepository";

export class ProjectRepository {

    private repository: MongoRepository<Project>;

    constructor() {
        this.repository = getMongoRepository(Project);
    }
}