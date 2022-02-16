"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const upload_controller_1 = require("../controllers/upload.controller");
const router = express_1.Router();
router.use(express_fileupload_1.default());
router.put('/:type/:id', upload_controller_1.fileUpload);
router.get('/:type/:photo', upload_controller_1.showImage);
exports.default = router;
//# sourceMappingURL=upload.route.js.map