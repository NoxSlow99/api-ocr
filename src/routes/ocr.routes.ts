import express from 'express';
import { authenticateToken } from '../middleware/jwt.middleware';
import { extractTextFromIne } from '../controller/ocr.controller';
import { validateDto } from '../middleware/validate.middleware';
import { OcrDto } from '../dto/request/index';

const router = express.Router();

router.post("/ine", authenticateToken, validateDto(OcrDto), extractTextFromIne);

export default router;