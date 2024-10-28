import { LogRepositoryImpl } from "../domain/repository/log.repository.impl";
import { CheckService } from "../domain/use-cases/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { CronService } from "./cron/cron-service";

const FileSystemRepository = new LogRepositoryImpl( new FileSystemDatasource );

export class Server{

    public static start(){
        console.log("Server started!");

        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const url = "https://google.com";
                new CheckService(
                    FileSystemRepository,
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