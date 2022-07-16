import {Injectable, NotFoundException} from '@nestjs/common';
import {ProjectRepository} from "src/api/project/schemas/project/project.repository";
import {Project} from "src/api/project/schemas/project/project.schema";
import {CreateProjectRequestDto} from "src/api/project/dto/create-project.request.dto";
import {DeleteProjectResponseDto} from "src/api/project/dto/delete-project.response.dto";
import {TemplateEngine} from "src/api/project/templates/TemplateEngine";

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

    async updateProject(updateProps : Partial<Project>, projectId: string) : Promise<Project> {
        if (projectId == null) {
            throw Error("Id for the project to update was undefined");
        }
        await this.projectRepository.findOneAndUpdate({_id: projectId}, updateProps);
        return this.projectRepository.findOne({_id: projectId});
    }

    async createProject(newProject: CreateProjectRequestDto): Promise<Project> {
        const project : Project = new Project(newProject.userId, newProject.genre, newProject.title, newProject.description, newProject.sections);
        return this.projectRepository.create(TemplateEngine.getTemplatedProject(project));
    }

    async deleteProjectById(projectId: string, userId: string) : Promise<DeleteProjectResponseDto> {
        const deleteProjectResponse: DeleteProjectResponseDto = new DeleteProjectResponseDto();
        const projectForDeletion = await this.getProjectById(projectId);
        if(projectForDeletion.userId !== userId) throw new NotFoundException("Project not found for this user")
        const results : {acknowledged: boolean, deletedCount: number} = await this.projectRepository.deleteProjectById(projectId);
        deleteProjectResponse.success = (results.deletedCount > 0);
        deleteProjectResponse.message = "Project deleted successfully";
        return deleteProjectResponse;
    }


}
