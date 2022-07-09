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
        this.logger.debug('WebSocket init!');
    }

    handleConnection(client: Socket, ...args: any[]): void {
        this.logger.debug(`client connected: ${client.id}`);
    }

    handleDisconnect(client: any): void {
        this.logger.debug(`client disconnected: ${client.id}`);
    }

    @SubscribeMessage('get-document')
    async getDocument(client: Socket, projectId: string): Promise<void> {
        this.logger.debug("User subscribed to get-document with id : "+projectId);
        if (projectId == null) return;
        const project: Project = await this.projectService.getProjectById(projectId);
        client.join(projectId);
        this.logger.debug("User joined room : "+projectId);
        client.emit("load-document",  project.data || {});
        this.logger.debug("Data emitted : "+projectId);
        client.on("save-document", async (dataToSave:String) => {
            this.logger.debug("Saving document : "+projectId);
            project.data = dataToSave;
            await this.projectService.updateProject(project, projectId);
        })
        client.on('send-changes', (delta: string) => {
            this.logger.debug("Broadcasting changes : "+projectId);
            client.broadcast.to(projectId).emit('receive-changes',delta);
        });
    }

}