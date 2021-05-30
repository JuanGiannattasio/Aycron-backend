import express, { Application } from 'express';


class Server {

    private app: Application;
    private port: string;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8081';
    }


    listen() {
        this.app.listen( this.port ,() => {
            console.log('Server online in ' + this.port);
        })
    }

}

export default Server;