
export enum EntityLevelNum{
    low = 'low',
    medium = 'medium',
    high = 'high'
}


export class LogEntity{
    public level : EntityLevelNum;
    public messagge : string;
    public createdAt : Date; 

    constructor(level: EntityLevelNum, messagge: string){
        this.level = level;
        this.messagge = messagge;
        this.createdAt = new Date();
    }

    static fromJson = ( json: string ): LogEntity => {
        const {messagge, level, createdAt} = JSON.parse(json);

        const log = new LogEntity(level, messagge);
        log.createdAt = new Date(createdAt);

        return log;
    }
}