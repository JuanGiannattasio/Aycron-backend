"use strict";
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
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const BurgerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        // required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
});
BurgerSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, burger = __rest(_a, ["__v"]);
    return burger;
};
const Burger = mongoose_2.default.model('Burger', BurgerSchema);
exports.default = Burger;
//# sourceMappingURL=burger.js.map