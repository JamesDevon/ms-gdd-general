import {SubscribeMessage, WebSocketGateway} from "@nestjs/websockets";
import {NestGateway} from "@nestjs/websockets/interfaces/nest-gateway.interface";
import {Logger} from "@nestjs/common";
import {Socket, Server} from 'socket.io';
import {ProjectService} from "../../api/project/project.service";
import {Project} from "../../api/project/schemas/project/project.schema";

@WebSocketGateway({cors: true})
export class EditorGateway implements NestGateway   {

    private logger: Logger = new Logger(EditorGateway.name);

    private server;

    constructor(private projectService: ProjectService) {
    }


    afterInit(server: Server): void {
        this.server = server;
        this.logger.log('WebSocket init!');
    }

    handleConnection(client: Socket, ...args: any[]): void {
        this.logger.log(`client connected: ${client.id}`);
    }

    handleDisconnect(client: any): void {
        this.logger.log(`client disconnected: ${client.id}`);
    }

    @SubscribeMessage('get-document')
    async getDocument(client: Socket, projectId: string): Promise<void> {
        if (projectId == null) return;
        const project: Project = await this.projectService.getProjectById(projectId);
        client.join(projectId);
        client.emit("load-document",  project.data || {});
        client.on("save-document", async (dataToSave:String) => {
            project.data = dataToSave;
            await this.projectService.updateProject(project);
        })
        client.on('send-changes', (delta: string) => {
            client.broadcast.to(projectId).emit('receive-changes',delta);
        });
    }

}