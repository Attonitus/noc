import fs from "node:fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, EntityLevelNum } from "../../domain/entities/log.entity";



export class FileSystemDatasource implements LogDatasource{

    private readonly logPath = "logs/";
    private readonly lowLogPath = "logs/logs-low.log"
    private readonly mediumLogPath = "logs/logs-medium.log"
    private readonly highLogPath = "logs/logs-high.log"

    constructor(){
        this.createLogsFiles()
    }

    private createLogsFiles(){
        if(!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        [
            this.lowLogPath,
            this.mediumLogPath,
            this.highLogPath
        ].forEach( path => {
            if(fs.existsSync(path)) return;
            fs.writeFileSync(path, "");
        });
    }




    async saveLog(log: LogEntity): Promise<void> {
        const logAsJson  = `${JSON.stringify(log)}\n` 

        switch(log.level){
            case EntityLevelNum.low:
                fs.appendFileSync(this.lowLogPath, logAsJson); 
                break;
            case EntityLevelNum.medium:
                fs.appendFileSync(this.mediumLogPath, logAsJson); 
                break;
            case EntityLevelNum.high:
                fs.appendFileSync(this.highLogPath, logAsJson); 
                break;

        }
    }


    private getFilesPath = (path: string) : LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        const logs = content.split('\n').map( log => LogEntity.fromJson(log));
        return logs;
    }

    async getLogs(severityLevel: EntityLevelNum): Promise<LogEntity[]> {
        
        switch(severityLevel){
            case EntityLevelNum.low:
                return this.getFilesPath(this.lowLogPath);
            case EntityLevelNum.medium:
                return this.getFilesPath(this.mediumLogPath);
            case EntityLevelNum.high:
                return this.getFilesPath(this.highLogPath);
            default:
                throw new Error(`${severityLevel} not implemented!`);
        }
    }

}