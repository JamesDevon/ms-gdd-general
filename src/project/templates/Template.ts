import {Project} from "../schemas/project/project.schema";
import {Section} from "../schemas/section/section.schema";

export abstract class Template {

    project: Project;
    sections: Section[] = [];

    abstract constructProject(project: Project);
    abstract getProject();
}