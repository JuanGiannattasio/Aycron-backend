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
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = process.env.PORT || '8081';
        // DB
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Public
        this.app.use(express_1.default.static('../public'));
    }
    routes() {
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server online in ' + this.port.blue);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map