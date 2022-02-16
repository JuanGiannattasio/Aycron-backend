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
exports.validateADMIN_ROLE_o_MismoUser = exports.validateADMIN_ROLE = exports.valdiateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const valdiateJWT = (req, res, next) => {
    // Leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hya token en la petición'
        });
    }
    try {
        // @ts-ignore
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.JWT);
        // @ts-ignore
        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }
};
exports.valdiateJWT = valdiateJWT;
const validateADMIN_ROLE = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const uid = req.uid;
    try {
        const userDB = yield user_1.default.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El user no existe'
            });
        }
        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes los privilegios necesarios'
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Revisar logs...'
        });
    }
});
exports.validateADMIN_ROLE = validateADMIN_ROLE;
const validateADMIN_ROLE_o_MismoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const uid = req.uid;
    const id = req.params.id;
    try {
        const userDB = yield user_1.default.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El user no existe'
            });
        }
        if (userDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        }
        else {
            return res.status(403).json({
                ok: false,
                msg: 'No tienes los privilegios necesarios'
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Revisar logs...'
        });
    }
});
exports.validateADMIN_ROLE_o_MismoUser = validateADMIN_ROLE_o_MismoUser;
//# sourceMappingURL=validate-roles.js.map