import { Router } from "express";
import { check } from "express-validator";

import { valdiateFields } from "../middlewares/valdiate-fields";

import { 
    getWarehouses, 
    getWarehousesById, 
    newWarehouse, 
    updateWarehouse, 
    deleteWarehouse 
} from "../controllers/warehouse.controller";

import { 
    valdiateJWT, 
    validateADMIN_ROLE 
} from '../middlewares/validate-roles';



const router = Router();


router.get('/', valdiateJWT, getWarehouses);

router.get('/:id', getWarehousesById);

// router.get('/getId', getWarehousesId);

router.post('/new', [
    check( 'code', 'The code is required' ).not().isEmpty(),
    check( 'name', 'The name is required' ).not().isEmpty(),
    check( 'address', 'The address is required' ).not().isEmpty(),
    check( 'state', 'The state is required' ).not().isEmpty(),
    valdiateFields
], newWarehouse);

router.put('/:id', [
    valdiateJWT,
    check( 'code', 'The code is required' ).not().isEmpty(),
    check( 'name', 'The name is required' ).not().isEmpty(),
    check( 'address', 'The address is required' ).not().isEmpty(),
    check( 'state', 'The state is required' ).not().isEmpty(),
    valdiateFields
], updateWarehouse);

router.delete('/:id', [
    valdiateJWT,
    validateADMIN_ROLE
], deleteWarehouse);


export default router;