import nodemailer from 'nodemailer'

interface EmailSenderOptions{
    to: string | string[],
    subject: string,
    html: string
    attachments?: Attachments[]
}

interface Attachments {
    filename: string,
    path : string
}


export class EmailService{

    constructor(
    ){}

    private transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL_SERVER,
            pass: process.env.MAILER_SECRET_KEY
        }
    })

    public async EmailSender(options: EmailSenderOptions): Promise<boolean>{

        const {to, subject, html, attachments} = options;
        try {

            const info = await this.transporter.sendMail({
                to,
                subject,
                html,
                attachments
            })
            console.log(info);

            return true;
        } catch (error) {
            return false;
        }
    }

    async EmailSenderWithLogs( to : string | string[]){
        const subject = "Logs del servidor";
        const html = `
        <h4>Aquí tienes tu reporte de logs del servidor
        para poder brindar un <strong>mayor seguimiento del sistema</strong></h4>
        <p>-------------------------------------------------</p>
        <p>🦙🦙🦙🦙🦙🦙🦙🦙🦙</p>
        <h3>Archivos adjuntos aqui: </h3>
        `;

        const attachments:Attachments[] = [
            { filename: 'logs-high.log', path: 'logs/logs-high.log'},
            { filename: 'logs-medium.log', path: 'logs/logs-medium.log'},
            { filename: 'logs-low.log', path: 'logs/logs-low.log'},
        ];

        return this.EmailSender({
            to,
            subject,
            html,
            attachments,
        });

    }


}