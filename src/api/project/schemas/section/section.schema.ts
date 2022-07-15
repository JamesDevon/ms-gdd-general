import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema()
export class Section {


    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    @Prop()
    title: string;

    @Prop()
    content: string;
}

export const SectionSchema= SchemaFactory.createForClass(Section);

export type SectionDocument = Section & Document;