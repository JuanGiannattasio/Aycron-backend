"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("colors");
const connection_1 = require("../db/connection");
const user_route_1 = __importDefault(require("../routes/user.route"));
const burger_route_1 = __importDefault(require("../routes/burger.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
const search_route_1 = __importDefault(require("../routes/search.route"));
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/user',
            auth: '/api/auth',
            burgers: '/api/burger',
            upload: '/api/upload',
            search: '/api/todo'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '3001';
        // DB
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.dbConnection();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Public
        this.app.use(express_1.default.static('public'));
        // Base route
        // this.app.get('*', (req: Request, res: Response) => {
        //     res.sendFile( path.resolve(__dirname, '../public/index.html') )
        // })
    }
    routes() {
        this.app.use(this.apiPaths.users, user_route_1.default);
        this.app.use(this.apiPaths.auth, auth_route_1.default);
        this.app.use(this.apiPaths.burgers, burger_route_1.default);
        this.app.use(this.apiPaths.upload, upload_route_1.default);
        this.app.use(this.apiPaths.search, search_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server online in ' + this.port.blue);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map