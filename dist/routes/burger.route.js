"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const burger_controller_1 = require("../controllers/burger.controller");
const validate_roles_1 = require("../middlewares/validate-roles");
const valdiate_fields_1 = require("../middlewares/valdiate-fields");
const router = express_1.Router();
router.get('/', burger_controller_1.getBurgers);
router.get('/full', burger_controller_1.getBurgersWithoutLimit);
router.get('/:id', validate_roles_1.valdiateJWT, burger_controller_1.getBurgerById);
router.post('/new', [
    validate_roles_1.valdiateJWT,
    validate_roles_1.validateADMIN_ROLE,
    express_validator_1.check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    express_validator_1.check('price', 'El precio del producto es obligatorio').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], burger_controller_1.newBurger);
router.put('/:id', burger_controller_1.updateBurger);
router.delete('/:id', burger_controller_1.deleteBurger);
exports.default = router;
//# sourceMappingURL=burger.route.js.map