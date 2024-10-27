
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
}