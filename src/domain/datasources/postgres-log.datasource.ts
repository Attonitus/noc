import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, EntityLevelNum } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource{
    
    
    async saveLog(Log: LogEntity): Promise<void> {

        const level = severityEnum[Log.level];

        const newLog = await prisma.logModel.create({
            data: {
                ...Log,
                level,
            }
        });

        console.log(newLog);
    }

    async getLogs(severityLevel: EntityLevelNum): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];

        const dbLogs = await prisma.logModel.findMany({
            where: { level }
        });

        return dbLogs.map( LogEntity.fromObject );
    }

}