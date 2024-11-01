
export enum EntityLevelNum{
    low = 'low',
    medium = 'medium',
    high = 'high'
}

interface EntityOptions {
    level: EntityLevelNum, 
    messagge: string,
    createdAt: Date,
    origin : string;
}


export class LogEntity{
    public level : EntityLevelNum;
    public messagge : string;
    public createdAt? : Date;
    public origin : string;

    constructor(options : EntityOptions){

        const {level, messagge, createdAt = new Date(), origin} = options;

        this.level = level;
        this.messagge = messagge;
        this.createdAt = createdAt,
        this.origin = origin
    }

    static fromJson = ( json: string ): LogEntity => {
        const {messagge, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            messagge,
            level,
            createdAt,
            origin
        });

        return log;
    }

    static fromObject = (object : {[key: string]: any}) => {
        const {messagge, level, createdAt, origin} = object;

        return new LogEntity({
            messagge, level, origin, createdAt
        })
    }
}