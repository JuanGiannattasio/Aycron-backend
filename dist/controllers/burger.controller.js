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
exports.deleteBurger = exports.updateBurger = exports.newBurger = exports.getBurgerById = exports.getBurgersWithoutLimit = exports.getBurgers = void 0;
const burger_1 = __importDefault(require("../models/burger"));
const getBurgers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    // Paginación y total de users
    const [burgers, total] = yield Promise.all([
        burger_1.default
            .find({}, 'name price stock description img')
            .skip(desde)
            .limit(5),
        burger_1.default.countDocuments()
    ]);
    try {
        return res.json({
            ok: true,
            burgers,
            total
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        });
    }
});
exports.getBurgers = getBurgers;
const getBurgersWithoutLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const burgers = yield burger_1.default.find();
        return res.json({
            ok: true,
            burgers
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        });
    }
});
exports.getBurgersWithoutLimit = getBurgersWithoutLimit;
const getBurgerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const burger = yield burger_1.default.findById(id)
            .populate('user', 'name img');
        if (!burger) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe burger con ese id'
            });
        }
        return res.json({
            ok: true,
            burger
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        });
    }
});
exports.getBurgerById = getBurgerById;
const newBurger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const uid = req.uid;
    const { name } = req.body;
    const burger = new burger_1.default(Object.assign({ user: uid }, req.body));
    try {
        const burgerExists = yield burger_1.default.findOne({ name });
        if (burgerExists) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una burger con ese nombre'
            });
        }
        const burgerDB = yield burger.save();
        return res.json({
            ok: true,
            burger: burgerDB
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        });
    }
});
exports.newBurger = newBurger;
const updateBurger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const uid = req.uid;
    const { id } = req.params;
    try {
        const burgerDB = yield burger_1.default.findById(id);
        if (!burgerDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe burger con ese id'
            });
        }
        const burgerChanges = Object.assign(Object.assign({}, req.body), { user: uid });
        const burgerUpdated = yield burger_1.default.findByIdAndUpdate(id, burgerChanges, { new: true });
        return res.json({
            ok: true,
            burgerUpdated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        });
    }
});
exports.updateBurger = updateBurger;
const deleteBurger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const burgerDB = yield burger_1.default.findById(id);
        if (!burgerDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe burger por ese id'
            });
        }
        yield burger_1.default.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Burger borrada'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar con un admin'
        });
    }
});
exports.deleteBurger = deleteBurger;
//# sourceMappingURL=burger.controller.js.map