import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";
import {Section} from "../section/section.entity";

@Schema()
export class Project {

    constructor(userId: string, title: string, sections: Section[]) {
        this.userId = userId;
        this.title = title;
        this.sections = sections;
    }

    @Prop()
    userId: string;

    @Prop()
    title: string;

    @Prop({type: [Types.ObjectId], ref: Section.name})
    sections: Section[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);

export type ProjectDocument = Project & Document;