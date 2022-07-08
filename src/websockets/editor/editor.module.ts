import { Module } from "@nestjs/common";
import {EditorGateway} from "./editor.gateway";
import {ProjectService} from "../../api/project/project.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Project, ProjectSchema} from "../../api/project/schemas/project/project.schema";
import {ProjectRepository} from "../../api/project/schemas/project/project.repository";

@Module({
    imports : [MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])],
    providers: [EditorGateway, ProjectService, ProjectRepository]
    }
)
export class EditorModule {}