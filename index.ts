import Server from './models/server';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'})

const server = new Server();


server.listen();


// mean_user
// 1Sne3e5mJ63PIHCl