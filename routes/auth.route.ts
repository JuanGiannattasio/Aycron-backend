import { Router } from "express";
import { check } from "express-validator";
import { login, renewToken, googleLogin } from '../controllers/auth.controller';
import { valdiateFields } from "../middlewares/valdiate-fields";
import { valdiateJWT } from '../middlewares/validate-roles';


const router = Router();


router.post('/', [
    check('email', 'The email is reuqired').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    valdiateFields
], login);

router.post('/google', [
    check('token', 'The token is required').not().isEmpty(),
    valdiateFields
], googleLogin)

router.get( '/renew', [ valdiateJWT ], renewToken);


export default router;