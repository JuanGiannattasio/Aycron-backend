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
exports.renewToken = exports.googleLogin = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../helpers/jwt");
const menu_frontend_1 = require("../helpers/menu-frontend");
const google_verify_1 = require("../helpers/google-verify");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar email
        const userDB = yield user_1.default.findOne({ email });
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'The user or password are wrong'
            });
        }
        ;
        // Verificar password
        const validPassword = bcryptjs_1.default.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'The user or password are wrong'
            });
        }
        // Generar token
        const token = yield (0, jwt_1.generateJWT)(userDB.id);
        return res.json({
            ok: true,
            token,
            menu: (0, menu_frontend_1.getMenuFrontend)(userDB.role),
            uid: userDB.id
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = yield (0, google_verify_1.googleVerify)(googleToken);
        // Verificar si existe usuario con ese email
        const userDB = yield user_1.default.findOne({ email });
        let user;
        if (!userDB) {
            // Si no existe el user se crea uno nuevo con estas caracteristicas
            user = new user_1.default({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else {
            // Si existe el user
            user = userDB;
            // @ts-ignore
            user.google = true;
        }
        // Guadrar en DB
        yield user.save();
        // JWT
        const token = yield (0, jwt_1.generateJWT)(user.id);
        return res.json({
            ok: true,
            token,
            menu: (0, menu_frontend_1.getMenuFrontend)(user.role)
        });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Incorrect token'
        });
    }
});
exports.googleLogin = googleLogin;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const uid = req.uid;
    try {
        const userDB = yield user_1.default.findById(uid);
        // Generar jwt
        const token = yield (0, jwt_1.generateJWT)(uid);
        return res.json({
            ok: true,
            token,
            userDB,
            menu: (0, menu_frontend_1.getMenuFrontend)(userDB.role)
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.controller.js.map