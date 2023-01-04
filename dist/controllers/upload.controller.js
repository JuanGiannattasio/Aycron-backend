"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showImage = exports.fileUpload = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const update_photo_1 = require("../helpers/update-photo");
const fileUpload = (req, res) => {
    const type = req.params.type;
    const id = req.params.id;
    // Validar tipos
    const validTypes = ['warehouse'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: `No es un tipo valido (${validTypes})`
        });
    }
    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }
    // Procesar la imagen...
    const file = req.files.image;
    // @ts-ignore Cortar nombre
    const cutName = file.name.split('.');
    const archiveExtension = cutName[cutName.length - 1];
    // Validar extension
    const validExtensions = ['csv', 'pdf'];
    if (!validExtensions.includes(archiveExtension)) {
        return res.status(400).json({
            ok: false,
            msg: `No es una extensión permtida (${validExtensions})`
        });
    }
    // Generar nombre dle archivo
    const archiveName = `${(0, uuid_1.v4)()}.${archiveExtension}`;
    // Crear el path para guadrar la imagen
    const path = `./dist/uploads/warehouse/${archiveName}`;
    // @ts-ignore Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la iamgen'
            });
        }
        // Actualizar base de datos
        (0, update_photo_1.updatePhoto)(type, id, archiveName);
        return res.json({
            ok: true,
            msg: 'Archibo subido',
            archiveName
        });
    });
};
exports.fileUpload = fileUpload;
const showImage = (req, res) => {
    const photo = req.params.photo;
    const pathImage = path_1.default.join(__dirname, `../uploads/warehouse/${photo}`);
    // Imagen por defecto
    if (fs_1.default.existsSync(pathImage)) {
        res.download(pathImage);
    }
    else {
        const pathImage = path_1.default.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImage);
    }
};
exports.showImage = showImage;
//# sourceMappingURL=upload.controller.js.map