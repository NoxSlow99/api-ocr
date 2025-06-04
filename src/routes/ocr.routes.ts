import express from "express";
import { authenticateToken } from "../middleware/jwt.middleware";
import { extractTextFromIne } from "../controller/ocr.controller";
import { validateDto } from "../middleware/validate.middleware";
import { OcrDto } from "../dto/request/index";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OCR
 *   description: Endpoints de extraccion de datos
 */

/**
 * @swagger
 * /extract/ine:
 *   post:
 *     summary: Extrae texto de la INE usando OCR de la API de Google Cloud Vision.
 *     tags: [OCR]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              imageFront: string (base64)
 *     responses:
 *       200:
 *         description: Texto extraído exitosamente.
 *       400:
 *         description: Formato de imagen no soportado. Debe ser JPEG o PNG.
 *       401:
 *         description: Token inválido o no enviado.
 */
router.post("/ine", authenticateToken, validateDto(OcrDto), extractTextFromIne);

export default router;
