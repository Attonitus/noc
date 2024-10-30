import { EmailService } from "../../../presentation/email/email-service";
import { EntityLevelNum, LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";


interface SendEmailLogInter{
    execute : (to: string | string[]) => Promise<boolean>
}

export class SendEmailLog implements SendEmailLogInter{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly emailService: EmailService
    ){}
    
    async execute (to: string | string[]) {
        try {

            const sent = await this.emailService.EmailSenderWithLogs(to);

            if(!sent){
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: EntityLevelNum.low,
                messagge: `Email log was sent!`,
                createdAt: new Date(),
                origin : "send-email-log.ts",
            });

            this.logRepository.saveLog(log);

            return true;
        } catch (error) {

            const log = new LogEntity({
                level: EntityLevelNum.high,
                messagge: `${error}`,
                createdAt: new Date(),
                origin : "send-email-log.ts",
            });

            this.logRepository.saveLog(log);

            return false;
        }
    }

    

}