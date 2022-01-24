import express, { Application } from 'express';
import cors from 'cors';
import 'colors'


class Server {

    private app: Application;
    private port: string;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8081';

        // DB
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

    }

    
    async dbConnection() {

    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Public
        this.app.use( express.static('../public') )

    }


    routes() {

    }

    listen() {
        this.app.listen( this.port ,() => {
            console.log('Server online in ' + this.port.blue);
        })
    }

}

export default Server;