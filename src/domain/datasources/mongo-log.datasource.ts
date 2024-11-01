import { LogModel } from "../../data/mongo/models/log-schema";
import { LogEntity, EntityLevelNum } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


export class MongoLogDatasource extends LogDatasource{


    async saveLog(Log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(Log);
        await newLog.save();
        console.log(`Log created: `, newLog.id);
    }

    async getLogs(severityLevel: EntityLevelNum): Promise<LogEntity[]> {
        
        const logs = await LogModel.find({
            level: severityLevel
        })

        return logs.map(LogEntity.fromObject);
    }

} 