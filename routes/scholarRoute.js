import express from 'express';
import { isScholar, requireSignIn }  from '../middlewares/authmiddleware.js'
import { getAllData, createData, getDataById, updateData, deleteData, updateScholarProfileController, searchScholarController } from '../controllers/scholarController.js'
const router = express.Router();

router.get("/",getAllData);
router.post("/",createData);
router.get("/:id",getDataById);
router.put("/:id",updateData);
router.get("/search/:keyword",searchScholarController);
router.delete("/:id",deleteData);






router.put("/scholarprofile", requireSignIn, isScholar, updateScholarProfileController);

export default router;