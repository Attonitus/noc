import { EntityLevelNum, LogEntity } from "../entities/log.entity";



export abstract class LogRepository{
    abstract saveLog(Log: LogEntity) : Promise<void> ;
    abstract getLogs(severityLevel: EntityLevelNum) : Promise<LogEntity[]>
}