"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valdiateFields = void 0;
const express_validator_1 = require("express-validator");
const valdiateFields = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
};
exports.valdiateFields = valdiateFields;
//# sourceMappingURL=valdiate-fields.js.map