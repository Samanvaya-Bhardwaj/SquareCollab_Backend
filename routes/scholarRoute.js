import express from 'express';
import { requireSignIn }  from '../middlewares/authmiddleware.js'
import { updateScholarProfileController } from '../controllers/scholarController.js'
const router = express.Router();






router.put("/researcherprofile", requireSignIn, updateScholarProfileController);

export default router;