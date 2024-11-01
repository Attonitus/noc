import { EntityLevelNum, LogEntity } from "../entities/log.entity";
import { LogRepository } from "../repositories/log.repository";

interface CheckServiceInterfaceMulti{
    execute: (url: string) => Promise<boolean>;
}

type successCallbackType = (() => void) | undefined;
type errorCallbackType = ((error: string) => void) | undefined; 



export class CheckServiceMulti implements CheckServiceInterfaceMulti{

    constructor(
        private readonly logRepository : LogRepository[],
        private readonly succesCallback: successCallbackType,
        private readonly errorCallback: errorCallbackType,
    ){};

    private callLogs = (log: LogEntity) => {
        this.logRepository.forEach( logRepository => logRepository.saveLog(log));
    }
    

    async execute(url: string) : Promise<boolean> {
        try {
            const res = await fetch(url);
            !res.ok ? new Error('Error on check service') : console.log(`${url} is ok!`);

            const log = new LogEntity({
                level: EntityLevelNum.low,
                messagge: `Service ${url} is working`,
                createdAt: new Date(),
                origin : "log.entity.ts",
            });

            this.callLogs(log);

            this.succesCallback && this.succesCallback();
            return true;

        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity({
                level: EntityLevelNum.high,
                messagge: `Error: ${errorMessage}. Service ${url} is NOT working.`,
                createdAt: new Date(),
                origin : "log.entity.ts",
            });

            this.callLogs(log);

            this.errorCallback && this.errorCallback(`${error}`);
            return false;
        }
    }
    
}