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
    check( 'name', 'The name is required' ).not().isEmpty(),
    check( 'email', 'The email is required' ).isEmail(),
    check( 'password', 'The password is required' ).not().isEmpty(),
    valdiateFields
], newUser);

router.put('/:id', [
    valdiateJWT,
    validateADMIN_ROLE_o_MismoUser,
    check( 'name', 'The name is required' ).not().isEmpty(),
    check( 'email', 'the email is rquired' ).isEmail(),
    check( 'role', 'The role is required' ).not().isEmpty(),
    valdiateFields
], updateUser);

router.delete('/:id', [
    valdiateJWT,
    validateADMIN_ROLE
], deleteUser);


export default router;