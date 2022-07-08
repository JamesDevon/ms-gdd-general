import { Injectable } from '@nestjs/common';
import {ProjectRepository} from "./schemas/project/project.repository";
import {Project} from "./schemas/project/project.schema";
import {CreateProjectRequestDto} from "./dto/create-project.request.dto";
import {DeleteProjectResponseDto} from "./dto/delete-project.response.dto";
import {TemplateEngine} from "./templates/TemplateEngine";

@Injectable()
export class ProjectService {

    constructor(private readonly projectRepository: ProjectRepository) {
    }

    async getProjectByUserId(userId: string) : Promise<Project[]> {
        return this.projectRepository.find({userId})
    }

    async getProjectById(projectId: string) : Promise<Project> {
        return this.projectRepository.findOne({_id: projectId});
    }

    async getAllProjects(): Promise<Project[]> {
        return this.projectRepository.findAll();
    }

    async updateProject(updateProps : Partial<Project>) : Promise<Project> {
        if (updateProps._id == null) {
            throw Error("Id for the project to update was undefined");
        }

        return this.projectRepository.findOneAndUpdate({_id: updateProps._id}, updateProps);
    }

    async createProject(newProject: CreateProjectRequestDto): Promise<Project> {
        const project : Project = new Project(newProject.userId, newProject.genre, newProject.title, newProject.description, newProject.sections);
        return this.projectRepository.create(TemplateEngine.getTemplatedProject(project));
    }

    async deleteProjectById(projectId: string) : Promise<DeleteProjectResponseDto> {
        const results : {acknowledged: boolean, deletedCount: number} = await this.projectRepository.deleteProjectById(projectId);
        const deleteProjectResponse: DeleteProjectResponseDto = new DeleteProjectResponseDto();
        deleteProjectResponse.success = (results.deletedCount > 0);
        deleteProjectResponse.message = "Project deleted successfully";
        return deleteProjectResponse;
    }


}
