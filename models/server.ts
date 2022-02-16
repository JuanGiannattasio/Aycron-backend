import express, { Application } from 'express';
import cors from 'cors';
import 'colors'

import { dbConnection } from '../db/connection';

import userRoute from '../routes/user.route';
import burgerRoute from '../routes/burger.route';
import authRoute from '../routes/auth.route';
import uploadRoute from '../routes/upload.route';
import searchRoute from '../routes/search.route';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/user',
        auth: '/api/auth',
        burgers: '/api/burger',
        upload: '/api/upload',
        search: '/api/todo'
    }
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';

        // DB
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

    }

    
    async dbConnection() {

        try {
            await dbConnection()
        } catch (error) {
            console.log(error)
        }

    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Public
        this.app.use( express.static('public') )

    }


    routes() {

        this.app.use( this.apiPaths.users, userRoute );
        this.app.use( this.apiPaths.auth, authRoute );
        this.app.use( this.apiPaths.burgers, burgerRoute );
        this.app.use( this.apiPaths.upload, uploadRoute );
        this.app.use( this.apiPaths.search, searchRoute );

    }

    listen() {
        this.app.listen( this.port ,() => {
            console.log('Server online in ' + this.port.blue);
        })
    }

}

export default Server;