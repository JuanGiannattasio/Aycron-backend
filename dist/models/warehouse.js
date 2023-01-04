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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WarehouseSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    country: {
        type: String,
    },
    zip: {
        type: Number,
    },
    file: {
        type: String
    }
});
WarehouseSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, user = __rest(_a, ["__v", "_id"]);
    user.uid = _id;
    return user;
};
const User = (0, mongoose_1.model)('Warehouse', WarehouseSchema);
exports.default = User;
//# sourceMappingURL=warehouse.js.map