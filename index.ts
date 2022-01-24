import Server from './models/server';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'})

const server = new Server();


server.listen();