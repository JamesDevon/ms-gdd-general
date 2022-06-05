import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

@Schema()
export class Section {

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop({type: [Types.ObjectId], ref: Section.name})
    sections: Section[];

}

export const SectionSchema= SchemaFactory.createForClass(Section);

export type SectionDocument = Section & Document;