import {Column, Entity, ObjectIdColumn, ObjectID, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Section {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    content: Object;

    @OneToOne(type => Section)
    @JoinColumn()
    child: Section;

}