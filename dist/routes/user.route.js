"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const valdiate_fields_1 = require("../middlewares/valdiate-fields");
const user_controller_1 = require("../controllers/user.controller");
const validate_roles_1 = require("../middlewares/validate-roles");
const router = (0, express_1.Router)();
router.get('/', validate_roles_1.valdiateJWT, user_controller_1.getUsers);
router.get('/:id', user_controller_1.getUserById);
router.post('/new', [
    (0, express_validator_1.check)('name', 'El nombre es requerido').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es requerido').isEmail(),
    (0, express_validator_1.check)('password', 'El password es requerido').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], user_controller_1.newUser);
router.put('/:id', [
    validate_roles_1.valdiateJWT,
    validate_roles_1.validateADMIN_ROLE_o_MismoUser,
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail(),
    (0, express_validator_1.check)('role', 'El rol es obligatorio').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], user_controller_1.updateUser);
router.delete('/:id', [
    validate_roles_1.valdiateJWT,
    validate_roles_1.validateADMIN_ROLE
], user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map