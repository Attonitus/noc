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
        const logAsJson  = `${JSON.stringify(log)}` 

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

        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: EntityLevelNum): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}