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
exports.deleteWarehouse = exports.updateWarehouse = exports.newWarehouse = exports.getWarehousesById = exports.getWarehouses = void 0;
const warehouse_1 = __importDefault(require("../models/warehouse"));
const getWarehouses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const desde = Number(req.query.desde) || 0;
    // Paginacion y total de users
    const [warehouses, total] = yield Promise.all([
        warehouse_1.default
            .find({}, 'code name address state country zip lat long file')
            .skip(desde)
            .limit(5),
        warehouse_1.default.countDocuments()
    ]);
    try {
        return res.json({
            ok: true,
            warehouses,
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
exports.getWarehouses = getWarehouses;
const getWarehousesById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Verificar si existe el user
        const warehouse = yield warehouse_1.default.findById(id);
        if (!warehouse) {
            res.status(404).json({
                ok: false,
                msg: `Warehouse doesnt exists with this id: ${id}`
            });
        }
        ;
        return res.json({
            ok: true,
            warehouse
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
exports.getWarehousesById = getWarehousesById;
const newWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    try {
        const warehouseExists = yield warehouse_1.default.findOne({ code });
        if (warehouseExists) {
            return res.status(400).json({
                ok: false,
                msg: `The code ${code} is alrerady register`
            });
        }
        const warehouse = new warehouse_1.default(req.body);
        // Guardar en DB
        yield warehouse.save();
        return res.json({
            ok: true,
            warehouse,
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
exports.newWarehouse = newWarehouse;
const updateWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Verificar si existe el user
        const warehouseDB = yield warehouse_1.default.findById(id);
        if (!warehouseDB) {
            res.status(404).json({
                ok: false,
                msg: `The warehouse doesnt exists with this id: ${id}`
            });
        }
        ;
        // Update
        const _a = req.body, { google, email, password } = _a, fields = __rest(_a, ["google", "email", "password"]);
        // if ( warehouseDB?.email !== email  ) {
        //     const emailExists = await User.findOne({ email });
        //     if ( emailExists ) {
        //         return res.status(400).json({
        //             ok: false,
        //             msg: `Ya existe un usuario con el email ${email}`
        //         })
        //     }
        // }
        // if ( !userDB?.google ) {
        //     fields.email = email;
        // } else if ( userDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuarios de google no pueden cambiar su correo'
        //     })
        // }
        // const userUpdated = await User.findByIdAndUpdate( id, fields, { new: true } )
        // return res.json({
        //     ok: true,
        //     userUpdated
        // })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Talk to admin'
        });
    }
});
exports.updateWarehouse = updateWarehouse;
const deleteWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const userDB = yield warehouse_1.default.findById(id);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: `Doesnt exists warehouse with this id: ${id}`
            });
        }
        yield warehouse_1.default.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: `Warehouse ${userDB.name} deleted`
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
exports.deleteWarehouse = deleteWarehouse;
//# sourceMappingURL=warehouse.controller.js.map