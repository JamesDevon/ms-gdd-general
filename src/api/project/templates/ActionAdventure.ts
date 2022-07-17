import {Project} from "src/api/project/schemas/project/project.schema";
import {Section} from "src/api/project/schemas/section/section.schema";
import {Template} from "src/api/project/templates/Template";

export  class ActionAdventure extends Template{


    constructProject(project: Project) {
        this.project = project
        this.sections = [];
        this.sections.push(new Section('Game Overview', '', []));
        this.sections.push(new Section('Game Background & Game Flow', '', []));
        this.sections.push(new Section('Game Play', '', []));
        this.sections.push(new Section('Game Play I/O Controls & GUI Interfaces', '', []));
        this.sections.push(new Section('Visual & Audio Features', '', []));
        this.sections.push(new Section('System Parameters & Requirements', '', []));
        this.sections.push(new Section('Creativity & Special Enhancements in Game Concept', '', []));
        this.project.sections = this.sections;
    }

    getProject() {
        return this.project;
    }

}