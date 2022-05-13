import {Entity, ObjectIdColumn, ObjectID, OneToOne, JoinColumn} from "typeorm";
import {Section} from "../section/section.entity";

@Entity()
export class Project {

    @ObjectIdColumn()
    id: ObjectID;

    @OneToOne(type => Section)
    @JoinColumn()
    section;

}