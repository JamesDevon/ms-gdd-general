import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Project, ProjectSchema} from "./schemas/project/project.schema";
import {ProjectRepository} from "./schemas/project/project.repository";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
      AuthModule,
  ],
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
})
export class ProjectModule {}
