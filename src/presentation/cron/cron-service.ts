import { CronJob } from 'cron';


type cronTimeType = string | Date;
type onTickType = () => void; 

export class CronService{

    static createJob(cronTime: cronTimeType, onTick: onTickType) : CronJob{
        const job = new CronJob( cronTime, onTick );

        job.start();

        return job;
    }
}