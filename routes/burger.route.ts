import { Router } from "express";
import { check } from "express-validator";

import { deleteBurger, getBurgerById, getBurgers, getBurgersWithoutLimit, newBurger, updateBurger } from "../controllers/burger.controller";
import { valdiateJWT, validateADMIN_ROLE } from '../middlewares/validate-roles';
import { valdiateFields } from '../middlewares/valdiate-fields';


const router = Router();


router.get('/', getBurgers);

router.get('/full', getBurgersWithoutLimit);

router.get('/:id', valdiateJWT, getBurgerById);

router.post('/new', [
    valdiateJWT,
    validateADMIN_ROLE,
    check( 'name', 'El nombre del producto es obligatorio' ).not().isEmpty(),
    check( 'price', 'El precio del producto es obligatorio' ).not().isEmpty(),
    valdiateFields
], newBurger);

router.put('/:id', updateBurger);

router.delete('/:id', deleteBurger)


export default router;