import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {Section} from "../section/section.schema";
import {GenreEnum} from "../../../enums/genre.enum";

@Schema()
export class Project {

    constructor(userId: string, genre: GenreEnum, title: string, description: string, sections: Section[]) {
        this.userId = userId;
        this.genre= genre;
        this.title = title;
        this.description = description;
        this.sections = sections;
    }

    @Prop()
    userId: string;

    @Prop()
    genre: GenreEnum;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    sections: Section[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);

export type ProjectDocument = Project & Document;