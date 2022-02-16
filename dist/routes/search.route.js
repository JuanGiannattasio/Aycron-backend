"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_roles_1 = require("../middlewares/validate-roles");
const search_controller_1 = require("../controllers/search.controller");
const router = express_1.Router();
router.get('/:search', validate_roles_1.valdiateJWT, search_controller_1.getSearch);
router.get('/coleccion/:tabla/:search', search_controller_1.getDocuments);
exports.default = router;
//# sourceMappingURL=search.route.js.map