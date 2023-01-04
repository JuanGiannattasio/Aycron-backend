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
exports.updatePhoto = void 0;
const fs_1 = __importDefault(require("fs"));
const warehouse_1 = __importDefault(require("../models/warehouse"));
const deleteImage = (path) => {
    // Eliminando el path de la imagen anterior
    if (fs_1.default.existsSync(path)) {
        fs_1.default.unlinkSync(path);
    }
};
const updatePhoto = (type, id, archiveName) => __awaiter(void 0, void 0, void 0, function* () {
    let oldPath = '';
    // Verificadno que existe user por ese id
    const warehouseDB = yield warehouse_1.default.findById(id);
    if (!warehouseDB) {
        console.log('No existe warehouse por ese ID');
        return false;
    }
    ;
    oldPath = `./uploads/warehouse/${warehouseDB.file}`;
    deleteImage(oldPath);
    // Cambiando el name y guardando en db
    warehouseDB.file = archiveName;
    yield warehouseDB.save();
    return true;
});
exports.updatePhoto = updatePhoto;
//# sourceMappingURL=update-photo.js.map