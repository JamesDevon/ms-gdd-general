import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

@Schema()
export class Section {


    constructor(title: string, content: string, sections: Section[]) {
        this.title = title;
        this.content = content;
        this.sections = sections;
    }

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    sections: Section[];

}

export const SectionSchema= SchemaFactory.createForClass(Section);

export type SectionDocument = Section & Document;