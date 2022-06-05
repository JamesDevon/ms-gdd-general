import {Section} from "../schemas/section/section.entity";

export class CreateProjectRequestDto {
    userId: string;
    title: string;
    sections: Section[];
}