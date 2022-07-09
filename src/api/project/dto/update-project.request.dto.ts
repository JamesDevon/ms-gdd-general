import {GenreEnum} from "../../../enums/genre.enum";

export class UpdateProjectRequestDto {
    title: string;
    genre: GenreEnum;
    description: string;
}