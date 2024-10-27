
interface CheckServiceInterface{
    execute: (url: string) => Promise<boolean>;
}

type successCallbackType = () => void;
type errorCallbackType = (error: string) => void; 


export class CheckService implements CheckServiceInterface{

    constructor(
        private readonly succesCallback: successCallbackType,
        private readonly errorCallback: errorCallbackType,
    ){};

    async execute(url: string) : Promise<boolean> {
        try {
            const res = await fetch(url);
            !res.ok ? new Error('Error on check service') : console.log(`${url} is ok!`);

            this.succesCallback();

            return true;
        } catch (error) {
            this.errorCallback(`${error}`);
            return false;
        }
    }
    
}