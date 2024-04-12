import express from 'express';
import { getAllData, createData, getDataById, updateData, deleteData, updateResearcherProfileController } from '../controllers/researcherController.js';
import { requireSignIn }  from '../middlewares/authmiddleware.js'

const router = express.Router();

router.get("/",getAllData);
router.post("/",createData);
router.get("/:id",getDataById);
router.put("/:id",updateData);
router.delete("/:id",deleteData);


router.put("/researcherprofile", requireSignIn, updateResearcherProfileController);

export default router;