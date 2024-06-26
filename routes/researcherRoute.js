import express from 'express';
import { getAllData, createData, getDataById, updateData, deleteData, updateResearcherProfileController,searchResearcherController } from '../controllers/researcherController.js';
import { isResearcher, requireSignIn }  from "../middlewares/authmiddleware.js"

const router = express.Router();

router.get("/",getAllData);
router.post("/",createData);
router.get("/:id",getDataById);
router.put("/:id",updateData);
router.get("/search/:keyword",searchResearcherController);
router.delete("/:id",deleteData);


router.put("/researcherprofile", requireSignIn, isResearcher, updateResearcherProfileController);

export default router;