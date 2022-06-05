import {Injectable} from "@nestjs/common";
import {Section, SectionDocument} from "./section.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class SectionRepository {

    constructor(@InjectModel(Section.name) private sectionModel: Model<SectionDocument>) {
    }


}