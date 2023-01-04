"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const valdiate_fields_1 = require("../middlewares/valdiate-fields");
const validate_roles_1 = require("../middlewares/validate-roles");
const router = (0, express_1.Router)();
router.post('/', [
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], auth_controller_1.login);
router.post('/google', [
    (0, express_validator_1.check)('token', 'El token es obligatorio').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], auth_controller_1.googleLogin);
router.get('/renew', [validate_roles_1.valdiateJWT], auth_controller_1.renewToken);
exports.default = router;
//# sourceMappingURL=auth.route.js.map