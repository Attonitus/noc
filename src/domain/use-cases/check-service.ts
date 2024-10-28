import { EntityLevelNum, LogEntity } from "../entities/log.entity";
import { LogRepository } from "../repositories/log.repository";

interface CheckServiceInterface{
    execute: (url: string) => Promise<boolean>;
}

type successCallbackType = () => void;
type errorCallbackType = (error: string) => void; 


export class CheckService implements CheckServiceInterface{

    constructor(
        private readonly logRepository : LogRepository,
        private readonly succesCallback: successCallbackType,
        private readonly errorCallback: errorCallbackType,
    ){};

    async execute(url: string) : Promise<boolean> {
        try {
            const res = await fetch(url);
            !res.ok ? new Error('Error on check service') : console.log(`${url} is ok!`);

            const log = new LogEntity(EntityLevelNum.low, `Service ${url} is working`)
            this.logRepository.saveLog(log)

            this.succesCallback();
            return true;
        } catch (error) {
            const errorMessage = `${error}`;
            const log = new LogEntity(EntityLevelNum.high, errorMessage);
            this.logRepository.saveLog(log)
            
            this.errorCallback(`${error}`);
            return false;
        }
    }
    
}