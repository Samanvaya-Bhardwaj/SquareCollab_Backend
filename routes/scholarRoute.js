import express from 'express';
import { requireSignIn }  from '../middlewares/authmiddleware.js'
import { getAllData, createData, getDataById, updateData, deleteData, updateScholarProfileController } from '../controllers/scholarController.js'
const router = express.Router();

router.get("/",getAllData);
router.post("/",createData);
router.get("/:id",getDataById);
router.put("/:id",updateData);
router.delete("/:id",deleteData);



router.put("/researcherprofile", requireSignIn, updateScholarProfileController);

export default router;