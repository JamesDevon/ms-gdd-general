import {Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ProjectService} from "./project.service";
import {CreateProjectRequestDto} from "./dto/create-project.request.dto";
import {AuthGuard} from "@nestjs/passport";
import {Project} from "./schemas/project/project.schema";
import {GetUser} from "../auth/utils/decorators/get-user.decorator";
import {User} from "../auth/entities/users/user.entity";

@UseGuards(AuthGuard())
@Controller('project')
export class ProjectController {

    constructor(private projectService: ProjectService) {
    }

    @HttpCode(200)
    @Get()
    getProjectsForUser(@GetUser() user: User) : Promise<Project[]> {
        return this.projectService.getProjectByUserId(user.id);
    }

    @HttpCode(201)
    @Post()
    createNewProject(@Body() newProject: CreateProjectRequestDto, @GetUser() user: User) : Promise<Project> {
        newProject.userId = user.id;
        return this.projectService.createProject(newProject);
    }

    @HttpCode(200)
    @Delete(":projectId" )
    deleteProjectById(@Param("projectId") projectId: string) {
        return this.projectService.deleteProjectById(projectId);
    }

}
