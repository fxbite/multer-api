import express from 'express';
import { upload } from '../config/multer';
import uploadControllers from '../controllers/UploadControllers';

const router = express.Router();

router.post('/single', upload.single('image'), uploadControllers.uploadSingleFile);
router.post('/multiple', upload.array('images', 3), uploadControllers.uploadMultipleFiles);
router.delete('/destroy/:file', uploadControllers.deleteFile);

export default router;
