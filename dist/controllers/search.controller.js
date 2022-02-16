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
exports.getDocuments = exports.getSearch = void 0;
const burger_1 = __importDefault(require("../models/burger"));
const user_1 = __importDefault(require("../models/user"));
const getSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.params;
    const regexp = new RegExp(search, 'i');
    try {
        const [users, burgers] = yield Promise.all([
            user_1.default.find({ name: regexp }),
            burger_1.default.find({ name: regexp }),
        ]);
        return res.json({
            ok: true,
            users,
            burgers
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar a un admin'
        });
    }
});
exports.getSearch = getSearch;
const getDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tabla } = req.params;
    const { search } = req.params;
    const regexp = new RegExp(search, 'i');
    try {
        let data = [];
        switch (tabla) {
            case 'users':
                data = yield user_1.default.find({ name: regexp });
                break;
            case 'burgers':
                data = yield burger_1.default.find({ name: regexp })
                    .populate('user', 'name img');
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla debe de ser users/burgers'
                });
        }
        return res.json({
            ok: true,
            resultados: data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor contactar a un admin'
        });
    }
});
exports.getDocuments = getDocuments;
//# sourceMappingURL=search.controller.js.map