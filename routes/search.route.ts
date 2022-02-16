import { Router } from "express";
import { valdiateJWT } from '../middlewares/validate-roles';

import { getDocuments, getSearch } from "../controllers/search.controller";


const router = Router();


router.get('/:search', valdiateJWT, getSearch);
router.get('/coleccion/:tabla/:search', getDocuments);


export default router;