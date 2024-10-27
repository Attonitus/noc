import { CheckService } from "../domain/use-cases/check-service";
import { CronService } from "./cron/cron-service";



export class Server{

    public static start(){
        console.log("Server started!");

        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const url = "https://google.com";
                new CheckService(
                () => {
                    console.log('Success!!');
                },
                error => {
                    console.log(`${url} failed! Error: ${error}`)
                }
                ).execute(url);
            }
        );
    }
}