import { EntityLevelNum, LogEntity } from "../entities/log.entity";



export abstract class LogDatasource{
    abstract saveLog(Log: LogEntity) : Promise<void> ;
    abstract getLogs(severityLevel: EntityLevelNum) : Promise<LogEntity[]>
}