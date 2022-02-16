import { Router } from "express";
import { check } from "express-validator";

import { valdiateFields } from "../middlewares/valdiate-fields";

import { 
    deleteUser, 
    getUserById, 
    getUsers, 
    newUser, 
    updateUser 
} from "../controllers/user.controller";

import { 
    valdiateJWT, 
    validateADMIN_ROLE_o_MismoUser, 
    validateADMIN_ROLE 
} from '../middlewares/validate-roles';



const router = Router();


router.get('/', valdiateJWT, getUsers);

router.get('/:id', getUserById);

router.post('/new', [
    check( 'name', 'El nombre es requerido' ).not().isEmpty(),
    check( 'email', 'El email es requerido' ).isEmail(),
    check( 'password', 'El password es requerido' ).not().isEmpty(),
    valdiateFields
], newUser);

router.put('/:id', [
    valdiateJWT,
    validateADMIN_ROLE_o_MismoUser,
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'role', 'El rol es obligatorio' ).not().isEmpty(),
    valdiateFields
], updateUser);

router.delete('/:id', [
    valdiateJWT,
    validateADMIN_ROLE
], deleteUser);


export default router;