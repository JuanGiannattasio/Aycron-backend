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
const burger_1 = __importDefault(require("../models/burger"));
const user_1 = __importDefault(require("../models/user"));
const deleteImage = (path) => {
    // Eliminando el path de la imagen anterior
    if (fs_1.default.existsSync(path)) {
        fs_1.default.unlinkSync(path);
    }
};
const updatePhoto = (type, id, archiveName) => __awaiter(void 0, void 0, void 0, function* () {
    let oldPath = '';
    switch (type) {
        case 'users':
            // Verificadno que existe user por ese id
            const userDB = yield user_1.default.findById(id);
            if (!userDB) {
                console.log('No existe user por ese ID');
                return false;
            }
            ;
            oldPath = `./uploads/users/${userDB.img}`;
            deleteImage(oldPath);
            // Cambiando el name y guardando en db
            userDB.img = archiveName;
            yield userDB.save();
            return true;
            break;
        case 'burgers':
            // Verificadno que existe user por ese id
            const burgerDB = yield burger_1.default.findById(id);
            if (!burgerDB) {
                console.log('No existe burger por ese ID');
                return false;
            }
            ;
            console.log(burgerDB.img);
            oldPath = `./uploads/burgers/${burgerDB.img}`;
            deleteImage(oldPath);
            // Cambiando el name y guardando en db
            burgerDB.img = archiveName;
            yield burgerDB.save();
            return true;
            break;
    }
});
exports.updatePhoto = updatePhoto;
//# sourceMappingURL=update-photo.js.map