import { Server } from "./presentation/server";
import 'dotenv/config'


(async() => {

    main();

})();


function main(){
    // console.log(process.env.MAIL_SERVER);
    Server.start();
}