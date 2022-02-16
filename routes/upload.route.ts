import { Router } from "express";
import expressFileUpload from 'express-fileupload';

import { fileUpload, showImage } from "../controllers/upload.controller";



const router = Router();
router.use( expressFileUpload() );

router.put('/:type/:id', fileUpload);
router.get('/:type/:photo', showImage);

export default router;