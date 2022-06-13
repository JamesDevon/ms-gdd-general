import {GenreEnum} from "../../enums/genre.enum";
import {Template} from "./Template";
import {ActionAdventure} from "./ActionAdventure";
import {Project} from "../schemas/project/project.schema";

export class TemplateEngine {

    private static TemplateMap = new Map<string, Template> ([
       [GenreEnum.AA, new ActionAdventure()],
    ]);

    static getTemplatedProject(project: Project) : Project {
        const template: Template = this.TemplateMap.get(GenreEnum[project.genre]);
        if(!template) {
            return project;
        }
        template.constructProject(project);
        return  template.getProject()
    }
}