import express from 'express';
const router = express.Router();
import cloudinary from '../helpers/cloudinary';
import upload from '../middlewares/multer';


router.post('/upload', upload.single('file'), uploadController.uploadFile);