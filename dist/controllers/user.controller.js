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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.newUser = exports.getUserById = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../helpers/jwt");
const menu_frontend_1 = require("../helpers/menu-frontend");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    // Paginacion y total de users
    const [users, total] = yield Promise.all([
        user_1.default
            .find({}, 'name email role google img')
            .skip(desde)
            .limit(5),
        user_1.default.countDocuments()
    ]);
    try {
        return res.json({
            ok: true,
            users,
            total
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Verificar si existe el user
        const user = yield user_1.default.findById(id);
        if (!user) {
            res.status(404).json({
                ok: false,
                msg: `User dont exists with this id: ${id}`
            });
        }
        ;
        return res.json({
            ok: true,
            user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.getUserById = getUserById;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExists = yield user_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already register'
            });
        }
        const user = new user_1.default(req.body);
        // Encriptar password
        const salt = bcryptjs_1.default.genSaltSync();
        user.password = bcryptjs_1.default.hashSync(password, salt);
        // Guardar en DB
        yield user.save();
        // Generar token
        const token = yield (0, jwt_1.generateJWT)(user.id);
        return res.json({
            ok: true,
            user,
            token,
            menu: (0, menu_frontend_1.getMenuFrontend)(user.role)
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.newUser = newUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Verificar si existe el user
        const userDB = yield user_1.default.findById(id);
        if (!userDB) {
            res.status(404).json({
                ok: false,
                msg: `User doesnt exists with this id: ${id}`
            });
        }
        ;
        // Update
        const _a = req.body, { google, email, password } = _a, fields = __rest(_a, ["google", "email", "password"]);
        if ((userDB === null || userDB === void 0 ? void 0 : userDB.email) !== email) {
            const emailExists = yield user_1.default.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    ok: false,
                    msg: `User already exists with this email: ${email}`
                });
            }
        }
        // if ( !userDB?.google ) {
        //     fields.email = email;
        // } else if ( userDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuarios de google no pueden cambiar su correo'
        //     })
        // }
        const userUpdated = yield user_1.default.findByIdAndUpdate(id, fields, { new: true });
        return res.json({
            ok: true,
            userUpdated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userDB = yield user_1.default.findById(id);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Doesnt exists user whit that id'
            });
        }
        yield user_1.default.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: `User ${userDB.name} deleted`
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map