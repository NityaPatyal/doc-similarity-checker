import express from 'express';
import multer from 'multer';
import { uploadAndCompareDocuments } from '../controllers/documentController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/compare', upload.array('files', 2), uploadAndCompareDocuments);

export default router;