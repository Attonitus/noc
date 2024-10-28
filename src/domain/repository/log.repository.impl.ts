import { LogDatasource } from "../datasources/log.datasource";
import { LogEntity, EntityLevelNum } from "../entities/log.entity";
import { LogRepository } from "../repositories/log.repository";


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly dataSource: LogDatasource
    ){}

    async saveLog(Log: LogEntity): Promise<void> {
        return this.dataSource.saveLog(Log);
    }
    
    async getLogs(severityLevel: EntityLevelNum): Promise<LogEntity[]> {
        return this.dataSource.getLogs(severityLevel);
    }

}