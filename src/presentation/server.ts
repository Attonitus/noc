import { LogRepositoryImpl } from "../domain/repository/log.repository.impl";
import { CheckService } from "../domain/use-cases/check-service";
import { SendEmailLog } from "../domain/use-cases/email/send-email-log";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const FileSystemRepository = new LogRepositoryImpl( new FileSystemDatasource );

const emailSevice = new EmailService();

export class Server{

    public static start(){
        console.log("Server started!");


        new SendEmailLog(
            FileSystemRepository, emailSevice
        ).execute('valenzuelarodriguezj512@gmail.com');
        
        // emailService.EmailSenderWithLogs(['xdkakaxd123@gmail.com']);

        // emailService.EmailSender({
        //     to: 'xdkakaxd123@gmail.com',
        //     subject: 'Avisos que avisan avisos',
        //     html: `
        //     <h3>Bienvenido a la escupidera de Salty</h3>
        //     <p>¿Qué tan rudo eres?</p>
        //     <p>🦨🦨🦨🦨</p>
        //     `
        // });

        // CronService.createJob(
        //     '*/2 * * * * *',
        //     () => {
        //         const url = "https://google.com";
        //         new CheckService(
        //             FileSystemRepository,
        //             () => {
        //                 console.log('Success!!');
        //             },
        //             error => {
        //                 console.log(`${url} failed! Error: ${error}`)
        //             }
        //         ).execute(url);
        //     }
        // );
    }
}