import {Section} from "../schemas/section/section.schema";
import {GenreEnum} from "../../../enums/genre.enum";

export class CreateProjectRequestDto {
    userId: string;
    genre: GenreEnum;
    title: string;
    description: string;
    sections: Section[];
}