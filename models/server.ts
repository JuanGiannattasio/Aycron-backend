import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import 'colors'

import { dbConnection } from '../db/connection';

import userRoute from '../routes/user.route';
import warehouseRoute from '../routes/warehouse.route';
import authRoute from '../routes/auth.route';
import uploadRoute from '../routes/upload.route';
// import searchRoute from '../routes/search.route';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/user',
        auth: '/api/auth',
        warehouse: '/api/warehouse',
        upload: '/api/upload',
        // search: '/api/todo'
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
        this.app.use( express.static('public'));

        // Base route
        // this.app.get('*', (req: Request, res: Response) => {
        //     res.sendFile( path.resolve(__dirname, '../public/index.html') )
        // })

    }


    routes() {

        this.app.use( this.apiPaths.users, userRoute );
        this.app.use( this.apiPaths.auth, authRoute );
        this.app.use( this.apiPaths.warehouse, warehouseRoute );
        this.app.use( this.apiPaths.upload, uploadRoute );
        // this.app.use( this.apiPaths.search, searchRoute );

    }

    listen() {
        this.app.listen( this.port ,() => {
            console.log('Server online in ' + this.port.blue);
        })
    }

}

export default Server;