"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const valdiate_fields_1 = require("../middlewares/valdiate-fields");
const warehouse_controller_1 = require("../controllers/warehouse.controller");
const validate_roles_1 = require("../middlewares/validate-roles");
const router = (0, express_1.Router)();
router.get('/', validate_roles_1.valdiateJWT, warehouse_controller_1.getWarehouses);
router.get('/:id', warehouse_controller_1.getWarehousesById);
// router.get('/getId', getWarehousesId);
router.post('/new', [
    (0, express_validator_1.check)('code', 'The code is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('address', 'The address is required').not().isEmpty(),
    (0, express_validator_1.check)('state', 'The state is required').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], warehouse_controller_1.newWarehouse);
router.put('/:id', [
    validate_roles_1.valdiateJWT,
    (0, express_validator_1.check)('code', 'The code is required').not().isEmpty(),
    (0, express_validator_1.check)('name', 'The name is required').not().isEmpty(),
    (0, express_validator_1.check)('address', 'The address is required').not().isEmpty(),
    (0, express_validator_1.check)('state', 'The state is required').not().isEmpty(),
    valdiate_fields_1.valdiateFields
], warehouse_controller_1.updateWarehouse);
router.delete('/:id', [
    validate_roles_1.valdiateJWT,
    validate_roles_1.validateADMIN_ROLE
], warehouse_controller_1.deleteWarehouse);
exports.default = router;
//# sourceMappingURL=warehouse.route.js.map