
import { MongoDatabase } from "../data/mongo/mongo-database";
import { MongoLogDatasource } from "../domain/datasources/mongo-log.datasource";

import { LogRepositoryImpl } from "../domain/repository/log.repository.impl";
import { CheckService } from "../domain/use-cases/check-service";

import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { CronService } from "./cron/cron-service";
import { PostgresLogDatasource } from "../domain/datasources/postgres-log.datasource";
import { CheckServiceMulti } from "../domain/use-cases/check-service-multiple";

const FileSystemRepository = new LogRepositoryImpl( new FileSystemDatasource);
const MongoRepository = new LogRepositoryImpl( new MongoLogDatasource);
const PostgresRepository = new LogRepositoryImpl( new PostgresLogDatasource);

// const emailSevice = new EmailService();

export class Server{

    public static async start(){
        
        await MongoDatabase.connect({
            mongoUrl: process.env.MONGO_URL as string,
            dbName: process.env.MONGO_DB_NAME as string
        });




        // const prisma = new PrismaClient();

        // const newData = await prisma.logModel.create({
        //     data: {
        //         level: 'HIGH',
        //         message: 'Test message go crazy',
        //         origin: 'server.ts'
        //     }
        // });

        // const logs = await prisma.logModel.findMany({
        //     where: {
        //         level: "LOW"
        //     }
        // });
        // console.log(logs);

        // const log = await LogModel.create({
        //     message: 'Hellow desde mongoose la llama que llama',
        //     origin: 'app.ts',
        //     level: 'low'
        // });


        // const logs = await logRepository.getLogs(EntityLevelNum.low);
        // console.log(logs);
        
        // const logs = await LogModel.find();
        
        // console.log(logs[2].message);

        //console.log("Server started!");

        // new SendEmailLog(
        //     FileSystemRepository, emailSevice
        // ).execute('valenzuelarodriguezj512@gmail.com');
        
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

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = "https://google.com";
                new CheckServiceMulti(
                    [FileSystemRepository, MongoRepository, PostgresRepository],
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